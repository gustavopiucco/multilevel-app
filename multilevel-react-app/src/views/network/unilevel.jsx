import React from "react";
import { Card, CardBody, CardTitle, Button, ButtonGroup } from 'reactstrap';
import ApiService from '../../services/api'
import UnilevelNetwork from '../../components/dashboard/network/unilevel'

class Unilevel extends React.Component {
    constructor(props) {
        super(props)

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this)

        this.state = {
            level: 1,
            network: [],
            isFetching: false
        }
    }

    componentDidMount() {
        this.onRadioBtnClick(1)
    }

    async onRadioBtnClick(radioSelected) {
        this.setState({ level: radioSelected, isFetching: true });

        const response = await ApiService.get('/unilevel/' + radioSelected)

        const json = await response.json()

        this.setState({ network: json.data, isFetching: false });
    }

    render() {
        return (
            <Card>
                <div className="p-3">
                    <CardTitle><i className="mdi mdi-border-all mr-2"></i>Unilevel Network </CardTitle>
                </div>
                <CardBody className="border-top">
                    <ButtonGroup className="mb-3">
                        <Button color="secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.level === 1}>Level 1</Button>
                        <Button color="secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.level === 2}>Level 2</Button>
                        <Button color="secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.level === 3}>Level 3</Button>
                    </ButtonGroup>

                    <ButtonGroup className="mb-3">
                        <Button color="secondary" onClick={() => this.onRadioBtnClick(4)} active={this.state.level === 4}>Level 4</Button>
                        <Button color="secondary" onClick={() => this.onRadioBtnClick(5)} active={this.state.level === 5}>Level 5</Button>
                        <Button color="secondary" onClick={() => this.onRadioBtnClick(6)} active={this.state.level === 6}>Level 6</Button>
                    </ButtonGroup>

                    {this.state.isFetching ? <h5 className="text-center">Loading...</h5> : <UnilevelNetwork network={this.state.network} />}

                </CardBody>
            </Card>
        );
    }
}

export default Unilevel;