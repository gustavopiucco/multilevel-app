import React from "react";
import { Table, Badge } from "reactstrap";

class UnilevelNetwork extends React.Component {
    //TODO: create a component to render plan name and plan img
    renderPlan(planId) {
        switch (planId) {
            case 1:
                return 'BT-100'
            case 2:
                return 'BT-500'
            case 3:
                return 'BT-1000'
            case 4:
                return 'BT-2500'
            case 5:
                return 'BT-5000'
            case 6:
                return 'BT-12500'
            case 7:
                return 'BT-25000'
            case 8:
                return 'BT-50000'
            default:
                return 'None'
        }
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

    render() {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Plan</th>
                        <th>Career Plan</th>
                        <th>Side</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.network.map((net, index) => {
                        return (
                            <tr key={index}
                            >
                                <td>{net.username}</td>
                                <td>{this.renderPlan(net.plan_id)}</td>
                                <td>{this.renderCareerPlan(net.career_plan)}</td>
                                <td>{(net.side) === 'left' ? <Badge color="warning">Left</Badge> : <Badge color="info">Right</Badge>}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}

export default UnilevelNetwork;
