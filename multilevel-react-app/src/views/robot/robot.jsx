import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'
//import CryptoCoins from '../../components/dashboard/cryptocoins/cryptocoins'
//import CryptoChart from '../../components/dashboard/cryptochart/cryptochart'
import CryptoMarket from '../../components/dashboard/cryptomarket/cryptomarket'
//import ForexLive from '../../components/dashboard/forexlive/forexlive'
import ApiService from '../../services/api'

class Robot extends React.Component {
    constructor(props) {
        super(props)

        this.timer = this.timer.bind(this)
        this.getRobotData = this.getRobotData.bind(this)

        this.state = {
            intervalId: null,
            robotData: null,
            refreshed: false,
        }
    }

    async componentDidMount() {
        this.getRobotData()

        const intervalId = setInterval(this.timer, 5000)

        this.setState({ intervalId: intervalId })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    async timer() {
        this.getRobotData()

        const script = document.createElement("script")

        script.src = "https://files.coinmarketcap.com/static/widget/currency.js"
        script.async = true

        document.body.appendChild(script)
    }

    async getRobotData() {
        const response = await ApiService.get('/robot')
        const json = await response.json()

        this.setState({ robotData: json.data })
    }

    render() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-robot mr-2"> </i>
                    Robot
                </CardTitle>
                <CardBody>
                    {/* <CryptoCoins />
                    <CryptoChart robotData={this.state.robotData} /> */}
                    {/* <ForexLive /> */}
                    <CryptoMarket robotData={this.state.robotData} />
                </CardBody>
            </Card>
        )
    }
}
export default Robot
