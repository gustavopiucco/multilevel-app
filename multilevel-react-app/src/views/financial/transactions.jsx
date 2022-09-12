import React from "react";
import { Card, CardBody, CardTitle, Button, ButtonGroup } from 'reactstrap';
import UnilevelTransactions from '../../components/dashboard/transactions/unilevel'
import WithdrawTransactions from '../../components/dashboard/transactions/withdraw'
import BinaryTransactions from "../../components/dashboard/transactions/binary";
import RobotTransactions from "../../components/dashboard/transactions/robot";
import ResidualTransactions from "../../components/dashboard/transactions/residual";
import CareerPlanTransactions from "../../components/dashboard/transactions/careerplan";

class Transactions extends React.Component {
    constructor(props) {
        super(props)

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this)
        this.renderTransactions = this.renderTransactions.bind(this)

        this.state = {
            radioSelected: null,
            transactions: [],
            isFetching: false
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const type = params.get('type');

        this.onRadioBtnClick(type)

    }

    async onRadioBtnClick(radioSelected) {
        this.setState({ radioSelected: radioSelected });
    }

    renderTransactions() {
        switch (this.state.radioSelected) {
            case 'unilevel':
                return <UnilevelTransactions />
            case 'binary':
                return <BinaryTransactions />
            case 'withdraw':
                return <WithdrawTransactions />
            case 'robot':
                return <RobotTransactions />
            case 'residual':
                return <ResidualTransactions />
            case 'careerplan':
                return <CareerPlanTransactions />
            default:
                return ''
        }
    }

    render() {
        return (
            <Card>
                <div className="p-3">
                    <CardTitle><i className="mdi mdi-border-all mr-2"></i>Transactions</CardTitle>
                </div>
                <CardBody className="border-top">
                    <ButtonGroup className="mb-3">
                        <Button color="secondary" onClick={() => this.onRadioBtnClick('unilevel')} active={this.state.radioSelected === 'unilevel'}>Unilevel</Button>
                        <Button color="secondary" onClick={() => this.onRadioBtnClick('binary')} active={this.state.radioSelected === 'binary'}>Binary</Button>
                        <Button color="secondary" onClick={() => this.onRadioBtnClick('residual')} active={this.state.radioSelected === 'residual'}>Residual</Button>
                    </ButtonGroup>
                    <ButtonGroup className="mb-3">
                        <Button color="secondary" onClick={() => this.onRadioBtnClick('robot')} active={this.state.radioSelected === 'robot'}>Robot</Button>
                        <Button color="secondary" onClick={() => this.onRadioBtnClick('careerplan')} active={this.state.radioSelected === 'careerplan'}>Career Plan</Button>
                        <Button color="secondary" onClick={() => this.onRadioBtnClick('withdraw')} active={this.state.radioSelected === 'withdraw'}>Withdraw</Button>
                    </ButtonGroup>

                    {this.renderTransactions()}

                </CardBody>
            </Card>
        );
    }
}

export default Transactions;