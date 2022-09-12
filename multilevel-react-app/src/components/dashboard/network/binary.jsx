import React from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import vis from 'vis'
import avatarNoPlan from 'assets/images/binary/avatar_noplan.jpg'
import avatarNoUser from 'assets/images/binary/avatar_nouser.jpg'
import avatarBT100 from 'assets/images/binary/avatar_bt100.jpg'
import avatarBT500 from 'assets/images/binary/avatar_bt500.jpg'
import avatarBT1000 from 'assets/images/binary/avatar_bt1000.jpg'
import avatarBT2500 from 'assets/images/binary/avatar_bt2500.jpg'
import avatarBT5000 from 'assets/images/binary/avatar_bt5000.jpg'
import avatarBT12500 from 'assets/images/binary/avatar_bt12500.jpg'
import avatarBT25000 from 'assets/images/binary/avatar_bt25000.jpg'
import avatarBT50000 from 'assets/images/binary/avatar_bt50000.jpg'

class BinaryNetwork extends React.Component {
    constructor(props) {
        super(props)

        this.networkRef = React.createRef()

        this.toggle = this.toggle.bind(this);

        this.state = {
            userData: null,
            modal: false
        }
    }

    getAvatar(planId) {
        switch (planId) {
            case 1:
                return avatarBT100
            case 2:
                return avatarBT500
            case 3:
                return avatarBT1000
            case 4:
                return avatarBT2500
            case 5:
                return avatarBT5000
            case 6:
                return avatarBT12500
            case 7:
                return avatarBT25000
            case 8:
                return avatarBT50000
            default:
                return avatarNoPlan
        }
    }

    renderPlan(planId) {
        let planImg, planName

        switch (planId) {
            case 1:
                planImg = avatarBT100
                planName = 'BT-100'
                break;
            case 2:
                planImg = avatarBT500
                planName = 'BT-500'
                break;
            case 3:
                planImg = avatarBT1000
                planName = 'BT-1000'
                break;
            case 4:
                planImg = avatarBT2500
                planName = 'BT-2500'
                break;
            case 5:
                planImg = avatarBT5000
                planName = 'BT-5000'
                break;
            case 6:
                planImg = avatarBT12500
                planName = 'BT-12500'
                break;
            case 7:
                planImg = avatarBT25000
                planName = 'BT-25000'
                break;
            case 8:
                planImg = avatarBT50000
                planName = 'BT-50000'
                break;
            default:
                planImg = avatarNoPlan
                planName = 'None'
                break;
        }

        return (
            <React.Fragment>
                <img src={planImg} alt={planName} width="25" />
                <span className="ml-2">{planName}</span>
            </React.Fragment>
        )
    }

    renderCareerPlan(careerPlanId) {
        switch (careerPlanId) {
            case 1:
                return 'Bronze'
            case 2:
                return 'Silver'
            case 3:
                return 'Gold'
            case 4:
                return 'Ruby'
            case 5:
                return 'Emerald'
            case 6:
                return 'Diamond'
            case 7:
                return 'Double Diamond'
            case 8:
                return 'Triple Diamond'
            case 9:
                return 'Black Diamond'
            default:
                return 'None'
        }
    }

    toggle() {
        this.setState({ modal: !this.state.modal })
    }

    componentDidMount() {
        this.nodes = new vis.DataSet()
        for (let node of this.props.data) {
            if (node.left_id && !node.right_id && node.level < 5) {
                this.nodes.add({
                    id: node.id + 'x',
                    shape: 'circularImage',
                    image: avatarNoUser,
                    level: node.level + 1
                })
            }

            if (node.right_id && !node.left_id && node.level < 5) {
                this.nodes.add({
                    id: node.id + 'x',
                    shape: 'circularImage',
                    image: avatarNoUser,
                    level: node.level + 1
                })
            }

            this.nodes.add({
                id: node.id,
                shape: 'circularImage',
                image: this.getAvatar(node.plan_id),
                label: node.username,
                level: node.level
            })
        }

        this.edges = new vis.DataSet()
        for (let node of this.props.data) {
            this.edges.add({
                from: node.id,
                to: node.left_id
            })

            if (node.left_id && !node.right_id) {
                this.edges.add({
                    from: node.id,
                    to: node.id + 'x'
                })
            }

            if (node.right_id && !node.left_id) {
                this.edges.add({
                    from: node.id,
                    to: node.id + 'x'
                })
            }

            this.edges.add({
                from: node.id,
                to: node.right_id
            })
        }

        this.options = {
            interaction: {
                dragNodes: false,
                hover: true
            },
            physics: false,
            nodes: {
                borderWidth: 2,
                color: {
                    border: '#8898aa',
                    highlight: {
                        border: '#8898aa',
                        background: '#8898aa'
                    },
                    hover: {
                        border: '#8898aa',
                        background: '#8898aa'
                    }
                },
                font: {
                    color: '#000'
                }
            },
            edges: {
                arrows: { to: true },
                shadow: true,
                smooth: {
                    type: 'cubicBezier',
                    forceDirection: 'vertical',
                    roundness: 0.4
                },
                color: {
                    color: '#8898aa',
                    highlight: '#000',
                }
            },
            layout: {
                hierarchical: {
                    direction: 'UD',
                    sortMethod: 'directed',
                    nodeSpacing: 200,
                    treeSpacing: 400
                }
            }
        }

        this.network = new vis.Network(this.networkRef.current, { nodes: this.nodes, edges: this.edges }, this.options)

        this.network.on('hoverNode', (e) => {
            //console.log('node hover: ', e)
        })

        this.network.on('click', (e) => {
            const userId = e.nodes[0]

            if (!userId || userId.includes('x')) return

            for (let user of this.props.data) {
                if (user.id === userId) {
                    this.setState({ userData: user })
                    this.toggle()
                    break
                }
            }
        })
    }

    componentWillUnmount() {
        this.network.destroy()
    }

    render() {
        return (
            <React.Fragment>
                <div ref={this.networkRef} style={{ height: "500px" }}></div>

                <div>
                    <Modal centered isOpen={this.state.modal}>
                        <ModalHeader >Binary Network</ModalHeader>
                        <ModalBody>
                            <table className="mt-4 table no-border mini-table m-t-20">
                                <tbody>
                                    <tr>
                                        <td><i className="mr-2 mdi mdi-worker"></i>Username</td>
                                        <td className="font-medium">{this.state.userData && this.state.userData.username}</td>
                                    </tr>
                                    <tr>
                                        <td><i className="mr-2 mdi mdi-worker"></i>Name</td>
                                        <td className="font-medium">{this.state.userData && this.state.userData.name}</td>
                                    </tr>
                                    <tr>
                                        <td><i className="mr-2 mdi mdi-vector-polygon"></i>Plan</td>
                                        <td className="font-medium">
                                            {this.state.userData ? this.renderPlan(this.state.userData.plan_id) : this.renderPlan(null)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><i className="mr-2 mdi mdi-star"></i>Career Plan</td>
                                        <td className="font-medium">
                                            {this.state.userData ? this.renderCareerPlan(this.state.userData.career_plan) : this.renderCareerPlan(null)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><i className="mr-2 mdi mdi-account-multiple"></i>Users <small>Left</small> | <small>Right</small></td>
                                        <td className="font-medium">{this.state.userData && this.state.userData.total_users_left + ' | ' + this.state.userData.total_users_right}</td>
                                    </tr>
                                    <tr>
                                        <td><i className="mr-2 mdi mdi-star"></i>Points <small>Left</small> | <small>Right</small></td>
                                        <td className="font-medium">{this.state.userData && this.state.userData.total_points_left + ' | ' + this.state.userData.total_points_right}</td>
                                    </tr>
                                    <tr>
                                        <td><i className="mr-2 mdi mdi-file-tree"></i>Qualified</td>
                                        <td className="font-medium">{this.state.userData && (this.state.userData.qualified ? 'Yes' : 'No')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info" onClick={() => this.props.changeBinaryUsername(this.state.userData.username)}>Network</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}

export default BinaryNetwork