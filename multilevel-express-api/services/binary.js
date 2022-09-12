const database = require('../lib/database')
const validator = require('validator')
const Queue = require('queue-fifo')
const CycleService = require('./cycle')

class BinaryService {

    async setUsersQualified() {
        const usersResult = await database.query(`SELECT id, left_id, right_id FROM users WHERE qualified = false`)

        const users = usersResult.rows

        for (let user of users) {
            //console.log('Lendo ' + user.id)

            const rootNode = user

            //left side
            let lastLeftNode = rootNode
            let leftQualified = false
            while (true) {
                if (lastLeftNode.left_id == null) break

                const result = await database.query(`SELECT id, parent_id, left_id, plan_id, role FROM users WHERE id = $1`, [lastLeftNode.left_id])
                lastLeftNode = result.rows[0]

                if (lastLeftNode.plan_id != null && lastLeftNode.parent_id == rootNode.id) { //if user has a plan and user is indicated by root
                    if (lastLeftNode.role != 'leader') {
                        leftQualified = true
                        break
                    }
                }
            }

            //right side
            let lastRightNode = rootNode
            let rightQualified = false
            while (true) {
                if (lastRightNode.right_id == null) break

                const result = await database.query(`SELECT id, parent_id, right_id, plan_id, role FROM users WHERE id = $1`, [lastRightNode.right_id])
                lastRightNode = result.rows[0]

                if (lastRightNode.plan_id != null && lastRightNode.parent_id == rootNode.id) { //if user has a plan and user is indicated by root
                    if (lastRightNode.role != 'leader') {
                        rightQualified = true
                        break
                    }
                }
            }

            await database.query(`UPDATE users SET 
            qualified = $2, 
            qualified_left = $3, 
            qualified_right = $4 
            WHERE id = $1`, [rootNode.id, (rightQualified && leftQualified), leftQualified, rightQualified])

            // if (leftQualified && rightQualified) {
            //     await database.query(`UPDATE users SET qualified = true WHERE id = $1`, [rootNode.id])
            // }
        }

        console.log('ok')
    }

    async checkQualification(rootUserId) {
        const result = await database.query(`SELECT id, left_id, right_id, binary_side FROM users WHERE id = $1`, [rootUserId])
        const rootNode = result.rows[0]

        //left side
        let lastLeftNode = rootNode
        let leftQualified = false
        while (true) {
            if (lastLeftNode.left_id == null) break

            const result = await database.query(`SELECT id, parent_id, left_id, plan_id, role FROM users WHERE id = $1`, [lastLeftNode.left_id])
            lastLeftNode = result.rows[0]

            if (lastLeftNode.plan_id != null && lastLeftNode.parent_id == rootNode.id) { //if user has a plan and user is indicated by root
                if (lastLeftNode.role != 'leader') {
                    leftQualified = true
                    break
                }
            }
        }

        //right side
        let lastRightNode = rootNode
        let rightQualified = false
        while (true) {
            if (lastRightNode.right_id == null) break

            const result = await database.query(`SELECT id, parent_id, right_id, plan_id, role FROM users WHERE id = $1`, [lastRightNode.right_id])
            lastRightNode = result.rows[0]

            if (lastRightNode.plan_id != null && lastRightNode.parent_id == rootNode.id) { //if user has a plan and user is indicated by root
                if (lastRightNode.role != 'leader') {
                    rightQualified = true
                    break
                }
            }
        }

        await database.query(`UPDATE users SET 
        qualified = $2, 
        qualified_left = $3, 
        qualified_right = $4 
        WHERE id = $1`, [rootNode.id, (rightQualified && leftQualified), leftQualified, rightQualified])
    }

    async setBinaryPosition(rootUserId, registeredUserId) {
        const result = await database.query(`SELECT id, left_id, right_id, binary_side FROM users WHERE id = $1`, [rootUserId])
        const rootNode = result.rows[0]

        let lastNode = rootNode

        while (true) {
            if (rootNode.binary_side == 'left' && lastNode.left_id == null) {
                //aqui atualiza o previous_id do registeredUserId, sendo o previous_id o lastNode.id
                await database.query(`UPDATE users SET previous_id = $2 WHERE id = $1`, [registeredUserId, lastNode.id])
                await database.query(`UPDATE users SET left_id = $2 WHERE id = $1`, [lastNode.id, registeredUserId])
                break
            }

            if (rootNode.binary_side == 'right' && lastNode.right_id == null) {
                await database.query(`UPDATE users SET previous_id = $2 WHERE id = $1`, [registeredUserId, lastNode.id])
                await database.query(`UPDATE users SET right_id = $2 WHERE id = $1`, [lastNode.id, registeredUserId])
                break
            }

            if (rootNode.binary_side == 'left' && lastNode.left_id != null) {
                const result = await database.query(`SELECT id, left_id, right_id, binary_side FROM users WHERE id = $1`, [lastNode.left_id])
                lastNode = result.rows[0]
            }

            if (rootNode.binary_side == 'right' && lastNode.right_id != null) {
                const result = await database.query(`SELECT id, left_id, right_id, binary_side FROM users WHERE id = $1`, [lastNode.right_id])
                lastNode = result.rows[0]
            }
        }
    }

    async searchInBinaryNetwork(rootUserId, searchUserId) {
        let queue = new Queue()

        const result = await database.query(`SELECT id, left_id, right_id, plan_id, name FROM users WHERE id = $1`, [rootUserId])
        const rootNode = result.rows[0]

        queue.enqueue(rootNode)

        while (queue.size() > 0) {
            let node = queue.peek()

            if (node.id == searchUserId)
                return true

            queue.dequeue()

            if (node.left_id != null) {
                const result = await database.query(`SELECT id, left_id, right_id, plan_id, name FROM users WHERE id = $1`, [node.left_id])
                queue.enqueue(result.rows[0])
            }

            if (node.right_id != null) {
                const result = await database.query(`SELECT id, left_id, right_id, plan_id, name FROM users WHERE id = $1`, [node.right_id])
                queue.enqueue(result.rows[0])
            }
        }

        return false
    }

    async getUsernameBinaryNetwork(userId, username) {
        const result = await database.query('SELECT id FROM users WHERE username = $1', [username])

        const user = result.rows[0]

        if (!user) return { error: true, errorCode: 400 }

        const searchInBinaryNetwork = await this.searchInBinaryNetwork(userId, user.id)

        if (!searchInBinaryNetwork) return { error: true, errorCode: 400 }

        const data = await this.getBinaryNetworkData(user.id, true)

        return { error: null, data: data }
    }


    async getBinaryNetwork(rootUserId) {
        const data = await this.getBinaryNetworkData(rootUserId, true)

        return { error: null, data: data }
    }

    //https://www.geeksforgeeks.org/print-level-order-traversal-line-line/
    async getBinaryNetworkData(rootUserId, limit = false) {
        let data = []
        let queue = new Queue()
        let level = 0

        const result = await database.query(`SELECT id, left_id, right_id, plan_id, username, name, qualified, career_plan, total_points_left, total_points_right, total_users_left, total_users_right FROM users WHERE id = $1`, [rootUserId])
        const rootNode = result.rows[0]

        queue.enqueue(rootNode)

        while (true) {
            let nodeCount = queue.size()

            if (nodeCount == 0)
                break

            if (limit && level > 5)
                break

            while (nodeCount > 0) {
                let node = queue.peek()

                if (node == null)
                    break

                node.level = level
                data.push(node)

                queue.dequeue() //pode dar problema aqui

                if (node.left_id != null) {
                    const result = await database.query(`SELECT id, left_id, right_id, plan_id, name, username, qualified, career_plan, total_points_left, total_points_right, total_users_left, total_users_right FROM users WHERE id = $1`, [node.left_id])
                    queue.enqueue(result.rows[0])
                }

                if (node.right_id != null) {
                    const result = await database.query(`SELECT id, left_id, right_id, plan_id, name, username, qualified, career_plan, total_points_left, total_points_right, total_users_left, total_users_right FROM users WHERE id = $1`, [node.right_id])
                    queue.enqueue(result.rows[0])
                }

                nodeCount--
            }

            level++
        }

        return data
    }

    async updateBinaryRightUsersCount() {
        const usersResult = await database.query('SELECT id, left_id, right_id, username FROM users ORDER BY id')

        const users = usersResult.rows

        for (let user of users) {
            let data = []
            let nodeStack = []
            let rightSideCounter = 0

            //console.log('Reading Right: ', user.username)

            const rootResult2 = await database.query(`SELECT id, left_id, right_id, username FROM users WHERE id = $1`, [user.right_id])
            const root2 = rootResult2.rows[0]

            nodeStack.push(root2)

            if (!user.right_id) continue

            while (nodeStack.length > 0) {
                const node = nodeStack.pop()
                data.push(node)
                rightSideCounter = rightSideCounter + 1

                if (node.right_id != null) {
                    const result = await database.query(`SELECT id, left_id, right_id, username FROM users WHERE id = $1`, [node.right_id])
                    nodeStack.push(result.rows[0])
                }

                if (node.left_id != null) {
                    const result = await database.query(`SELECT id, left_id, right_id, username FROM users WHERE id = $1`, [node.left_id])
                    nodeStack.push(result.rows[0])
                }
            }

            await database.query(`UPDATE users SET total_users_right = $2 WHERE id = $1`, [user.id, rightSideCounter])
            //console.log(rightSideCounter)
        }
    }

    async updateBinaryLeftUsersCount() {
        const usersResult = await database.query('SELECT id, left_id, right_id, username FROM users ORDER BY id')

        const users = usersResult.rows

        for (let user of users) {
            let data = []
            let nodeStack = []
            let leftSideCounter = 0

            //console.log('Reading Left: ', user.username)

            const rootResult = await database.query(`SELECT id, left_id, right_id, username FROM users WHERE id = $1`, [user.left_id])
            const root = rootResult.rows[0]

            nodeStack.push(root)

            if (!user.left_id) continue

            while (nodeStack.length > 0) {
                const node = nodeStack.pop()
                data.push(node)
                leftSideCounter = leftSideCounter + 1

                if (node.right_id != null) {
                    const result = await database.query(`SELECT id, left_id, right_id, username FROM users WHERE id = $1`, [node.right_id])
                    nodeStack.push(result.rows[0])
                }

                if (node.left_id != null) {
                    const result = await database.query(`SELECT id, left_id, right_id, username FROM users WHERE id = $1`, [node.left_id])
                    nodeStack.push(result.rows[0])
                }
            }

            await database.query(`UPDATE users SET total_users_left = $2 WHERE id = $1`, [user.id, leftSideCounter])
            //console.log(leftSideCounter)
        }
    }

    getPlanIdPrice(planId) {
        switch (planId) {
            case 1:
                return 100.00
            case 2:
                return 500.00
            case 3:
                return 1000.00
            case 4:
                return 2500.00
            case 5:
                return 5000.00
            case 6:
                return 12500.00
            case 7:
                return 25000.00
            case 8:
                return 50000.00
            default:
                return 0
        }
    }

    async updateBinaryLeftUsersPoint() {
        const usersResult = await database.query('SELECT id, left_id, right_id, username, role FROM users ORDER BY id')

        const users = usersResult.rows

        for (let user of users) {
            let data = []
            let nodeStack = []
            let leftSideCounter = 0

            //console.log('Reading Left: ', user.username)

            const rootResult = await database.query(`SELECT id, left_id, right_id, username, plan_id, role FROM users WHERE id = $1`, [user.left_id])
            const root = rootResult.rows[0]

            nodeStack.push(root)

            if (!user.left_id) continue

            while (nodeStack.length > 0) {
                const node = nodeStack.pop()
                data.push(node)
                if (node.role == 'user') {
                    leftSideCounter = leftSideCounter + (this.getPlanIdPrice(node.plan_id))
                }

                if (node.right_id != null) {
                    const result = await database.query(`SELECT id, left_id, right_id, username, plan_id, role FROM users WHERE id = $1`, [node.right_id])
                    nodeStack.push(result.rows[0])
                }

                if (node.left_id != null) {
                    const result = await database.query(`SELECT id, left_id, right_id, username, plan_id, role FROM users WHERE id = $1`, [node.left_id])
                    nodeStack.push(result.rows[0])
                }
            }

            await database.query(`UPDATE users SET total_points_left = $2 WHERE id = $1`, [user.id, leftSideCounter])
            //console.log(leftSideCounter)
        }
    }

    async updateBinaryRightUsersPoint() {
        const usersResult = await database.query('SELECT id, left_id, right_id, username, role FROM users ORDER BY id')

        const users = usersResult.rows

        for (let user of users) {
            let data = []
            let nodeStack = []
            let rightSideCounter = 0

            //console.log('Reading Right: ', user.username)

            const rootResult2 = await database.query(`SELECT id, left_id, right_id, username, plan_id, role FROM users WHERE id = $1`, [user.right_id])
            const root2 = rootResult2.rows[0]

            nodeStack.push(root2)

            if (!user.right_id) continue

            while (nodeStack.length > 0) {
                const node = nodeStack.pop()
                data.push(node)
                if (node.role == 'user') {
                    rightSideCounter = rightSideCounter + (this.getPlanIdPrice(node.plan_id))
                }

                if (node.right_id != null) {
                    const result = await database.query(`SELECT id, left_id, right_id, username, plan_id, role FROM users WHERE id = $1`, [node.right_id])
                    nodeStack.push(result.rows[0])
                }

                if (node.left_id != null) {
                    const result = await database.query(`SELECT id, left_id, right_id, username, plan_id, role FROM users WHERE id = $1`, [node.left_id])
                    nodeStack.push(result.rows[0])
                }
            }

            await database.query(`UPDATE users SET total_points_right = $2 WHERE id = $1`, [user.id, rightSideCounter])
            //console.log(rightSideCounter)
        }
    }

    async updateAllPreviousId() {
        const usersResult = await database.query('SELECT id, left_id, right_id, username, role FROM users ORDER BY id')

        const users = usersResult.rows

        for (let user of users) {
            //left
            if (user.left_id != null) {
                const resultUserLeft = await database.query('SELECT id FROM users WHERE id = $1', [user.left_id])
                const userLeft = resultUserLeft.rows[0]

                await database.query('UPDATE users SET previous_id = $2 WHERE id = $1', [userLeft.id, user.id])

                //console.log('User: ', userLeft.id, 'Previous: ', user.id)
            }

            //right
            if (user.right_id != null) {
                const resultUserRight = await database.query('SELECT id FROM users WHERE id = $1', [user.right_id])
                const userRight = resultUserRight.rows[0]

                await database.query('UPDATE users SET previous_id = $2 WHERE id = $1', [userRight.id, user.id])

                //console.log('User: ', userRight.id, 'Previous: ', user.id)
            }
        }
    }

    async incrementPreviousUsersCount(userId) {
        let data = []
        let previousNode = null

        const resultRoot = await database.query('SELECT id, left_id, right_id, previous_id, username FROM users WHERE id = $1', [userId])
        const root = resultRoot.rows[0]

        previousNode = root

        while (true) {
            if (previousNode == null) break

            data.push(previousNode)

            const resultNode = await database.query('SELECT id, left_id, right_id, previous_id, username FROM users WHERE id = $1', [previousNode.previous_id])
            const node = resultNode.rows[0]

            previousNode = node
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i + 1] == null) break

            const side = (data[i].id == data[i + 1].left_id) ? 'left' : 'right'

            if (side === 'left') {
                await database.query('UPDATE users SET total_users_left = total_users_left + 1 WHERE id = $1', [data[i + 1].id])
            }
            else {
                await database.query('UPDATE users SET total_users_right = total_users_right + 1 WHERE id = $1', [data[i + 1].id])
            }
        }
    }

    async incrementPreviousPointsCount(userId, points) {
        let data = []
        let previousNode = null

        const resultRoot = await database.query('SELECT id, parent_id, left_id, right_id, previous_id, username, plan_id, qualified, qualified_left, qualified_right, role FROM users WHERE id = $1', [userId])
        const root = resultRoot.rows[0]

        previousNode = root

        while (true) {
            if (previousNode == null) break

            data.push(previousNode)

            const resultNode = await database.query('SELECT id, parent_id, left_id, right_id, previous_id, username, plan_id, qualified, qualified_left, qualified_right, role FROM users WHERE id = $1', [previousNode.previous_id])
            const node = resultNode.rows[0]

            previousNode = node
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i + 1] == null) break
            if (data[i + 1].plan_id == null) continue

            const side = (data[i].id == data[i + 1].left_id) ? 'left' : 'right'

            //console.log(data[i + 1].username, points)

            if (root.parent_id == data[i + 1].id) {
                //console.log(root.username + ' é patrocinado por ' + data[i + 1].username)
                if (side === 'left' && data[i + 1].qualified_left) {
                    await database.query('UPDATE users SET total_points_left = total_points_left + $2 WHERE id = $1', [data[i + 1].id, points])
                }

                if (side === 'right' && data[i + 1].qualified_right) {
                    await database.query('UPDATE users SET total_points_right = total_points_right + $2 WHERE id = $1', [data[i + 1].id, points])
                }
            }
            else {
                //console.log(root.username + ' NÃO é patrocinado por ' + data[i + 1].username)
                if (side === 'left') {
                    await database.query('UPDATE users SET total_points_left = total_points_left + $2 WHERE id = $1', [data[i + 1].id, points])
                }
                else {
                    await database.query('UPDATE users SET total_points_right = total_points_right + $2 WHERE id = $1', [data[i + 1].id, points])
                }
            }
        }
    }
}

module.exports = BinaryService