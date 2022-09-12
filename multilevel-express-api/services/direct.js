const database = require('../lib/database')

class DirectService {
    constructor() { }

    async getLeftSide(rootUserId) {
        let data = []

        const resultRoot = await database.query(`SELECT id, username, parent_id, left_id, plan_id, role FROM users WHERE id = $1`, [rootUserId])
        const rootNode = resultRoot.rows[0]

        let lastLeftNode = rootNode

        while (true) {
            if (lastLeftNode == null) break

            if (lastLeftNode.parent_id == rootUserId) { 
                data.push(lastLeftNode.id)
            }

            const result = await database.query(`SELECT id, username, parent_id, left_id, plan_id, role FROM users WHERE id = $1`, [lastLeftNode.left_id])
            lastLeftNode = result.rows[0]
        }

        return data
    }

    async getDirectNetworkData(userId) {
        const resultFirstLevel = await database.query(`
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
        SELECT p.id, p.username, p.plan_id, p.career_points, p.career_plan
        FROM descendants d
        INNER JOIN users p
        ON d.id = p.id
        WHERE p.id <> $1 AND depth = 1                                                 
        `, [userId])

        let data = []
        const leftIds = await this.getLeftSide(userId)

        for (let user of resultFirstLevel.rows) {
            let side = 'right'

            if (leftIds.includes(user.id)) {
                side = 'left'
            }

            data.push({
                username: user.username,
                plan_id: user.plan_id,
                career_points: user.career_points,
                career_plan: user.career_plan,
                side: side
            })
        }

        return data
    }

    async getDirectNetwork(userId) {
        const data = await this.getDirectNetworkData(userId)
        return { error: null, data: data}
    }
}

module.exports = DirectService