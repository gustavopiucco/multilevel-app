const database = require('../lib/database')
const validator = require('validator')
const CycleService = require('../services/cycle')

class UnilevelService {
    constructor() {
        this.levelPercentage = [5, 1, 1, 1, 1, 1]
    }

    async getUnilevelNetwork(userId, level) {
        const result = await database.query(`
        WITH RECURSIVE descendants AS (
            SELECT id, parent_id, 0 depth
            FROM users
            WHERE id = $1
        UNION
            SELECT p.id, p.parent_id, d.depth + 1
            FROM users p
            INNER JOIN descendants d
            ON p.parent_id = d.id
        )
        SELECT p.username, p.plan_id, depth AS level, p.created_at AS date
        FROM descendants d
        INNER JOIN users p
        ON d.id = p.id
        WHERE p.id <> $1 AND depth = $2
        `, [userId, level])

        return { error: null, data: result.rows }
    }

    async payDirectAndIndirectGains(userId, basePrice, planId) {
        basePrice = parseFloat(basePrice)

        const client = await database.getPoolClient()

        //TODO: re-check transaction implementation. Handle rollback correctly
        try {
            await client.query('BEGIN')

            //TODO: fix concurrency between recursive parent tree query and update balance
            let parentTree = await client.query(`WITH RECURSIVE parents AS (SELECT * FROM users WHERE id = $1 UNION ALL SELECT users.* FROM users JOIN parents ON parents.parent_id = users.id) SELECT id AS user_id, plan_id, role FROM parents ORDER BY id DESC`, [userId])
            parentTree = parentTree.rows

            for (let level = 1; level < parentTree.length; level++) {
                if (level > this.levelPercentage.length) break; //limit payment in N level

                let amountToPay = (this.levelPercentage[level - 1] / 100) * basePrice
                amountToPay = parseFloat(amountToPay.toFixed(2))
                const userToPay = parentTree[level].user_id
                const userHasPlan = parentTree[level].plan_id
                const userPlanId = parentTree[level].plan_id

                if (userHasPlan) { //user must have a plan
                    const cycleService = new CycleService()
                    //console.log(userToPay, planId, amountToPay)
                    await cycleService.increaseNetworkBalance(userToPay, userPlanId, amountToPay)

                    await client.query(`INSERT INTO unilevel_transactions(from_user_id, to_user_id, plan_id, amount_paid, level) VALUES($1, $2, $3, $4, $5)`, [userId, userToPay, planId, amountToPay, level])
                }
            }

            await client.query('COMMIT')
        }
        catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
        finally {
            client.release()
        }
    }
}

module.exports = UnilevelService