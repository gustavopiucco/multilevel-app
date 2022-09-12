import React from 'react'
import { Row, Card, CardBody, CardTitle } from 'reactstrap'
import Ticket from '../../components/ticket/ticket'

import imgTicket1 from '../../assets/images/event/ticket-1.jpg'
import imgTicket2 from '../../assets/images/event/ticket-2.jpg'

class Event extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Ticket name="Ticket 1 - Event" price={79.00} type="Event" img={imgTicket1} />
                    <Ticket name="Ticket 2 - Event + Dinner" price={159.00} type="Event + Dinner" img={imgTicket2} />
                </Row>

                <Card>
                    <CardTitle className="border-bottom p-3 mb-0">
                        <i className="mdi mdi-airplane mr-2"> </i>
                        Macau Event
                    </CardTitle>
                    <CardBody>
                        <p>To buy your Ticket send an email to <a href="mailto:contact@Multilevel.com">contact@Multilevel.com</a> with the following information:</p>
                        <p><i className="mr-2 mdi mdi-arrow-right-bold"></i>Username</p>
                        <p><i className="mr-2 mdi mdi-arrow-right-bold"></i>Name</p>
                        <p><i className="mr-2 mdi mdi-arrow-right-bold"></i>Ticket Quantity and Ticket Type</p>
                        <p><i className="mr-2 mdi mdi-arrow-right-bold"></i>Reason why I or my team want to participate in the event</p>
                        <p>We will review your request and return with availability and purchase information.</p>

                        <h4 className="mt-4 mb-4">Bonus</h4>

                        <p>After the event, a bonus of US $ 2500 will be paid to participants with the following criteria:</p>
                        <p>- Have the sum of $ 100,000 direct referral or 1,000,000 career plan points in the period from August 8 until September 8.</p>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}
export default Event
