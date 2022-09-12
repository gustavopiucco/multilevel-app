import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

class Support extends React.Component {
    render() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-help-circle-outline mr-2"> </i>
                    Support
                </CardTitle>
                <CardBody>
                    <h5 className="text-center">All support requests must be submitted to <a href="mailto:contact@Multilevel.com">contact@Multilevel.com</a></h5>
                    <h5 className="text-center">All requests must be in English. You can use a translator.</h5>
                </CardBody>
            </Card>
        )
    }
}
export default Support
