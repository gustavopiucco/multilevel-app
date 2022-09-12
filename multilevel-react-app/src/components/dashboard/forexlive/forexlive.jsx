import React from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
//import Iframe from 'react-iframe'

class ForexLive extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardBody>
                            <CardTitle>Forex</CardTitle>
                            <CardSubtitle>Live Trading</CardSubtitle>
                            {/* <div className="embed-responsive embed-responsive-4by3">
                                <Iframe url="https://www.youtube.com/embed/NzmTj68y4jk" width="100%" id="forex" className="embed-responsive-item" height="100%" />
                            </div> */}
                            <div className="embed-responsive embed-responsive-4by3">
                            <iframe title="Live Trading" src="https://player.twitch.tv/?channel=Multilevel" frameBorder="0" allowFullScreen="true" scrolling="no" height="378" width="620"></iframe>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default ForexLive