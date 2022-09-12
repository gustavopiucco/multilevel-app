import React from "react"
import { Card, CardBody, CardTitle } from 'reactstrap'
import Chart from 'react-c3-component'
import 'c3/c3.css'

class DailyEarnings extends React.Component {
    render() {
        return (
            <Card className="card-hover">
                <CardBody>
                    <CardTitle>Daily Earnings</CardTitle>
                    <Chart
                        config={{
                            data: {
                                columns: [
                                    ["option1", 30, 200, 100, 400, 150, 250, 60, 120, 180, 50],
                                    ["option2", 30, 120, 210, 40, 50, 205, 30, 120, 80, 65]
                                ]
                            },
                            grid: { y: { show: !0, stroke: "#ff0" } },
                            size: { height: 400 },
                            point: { r: 4 },
                            color: { pattern: ["#2962FF", "#4fc3f7"] }
                        }}
                    />
                </CardBody>
            </Card>
        )
    }
}

export default DailyEarnings