import React from "react";
import { Card, CardBody, CardTitle } from 'reactstrap';

class News extends React.Component {
    render() {
        return (
            <Card className="card-hover">
                <CardBody>
                    <CardTitle>News</CardTitle>
                    <Card className="border bg-light">
                        <CardBody>
                            <h5>Multilevel Cryptocurrency and Exchange</h5>
                            <p>All withdrawals from October 1st will be paid with the new Multilevel cryptocurrency. All trades will be made on the Multilevel exclusive Exchange. Please wait for further information.</p>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>
        );
    }
}

export default News;