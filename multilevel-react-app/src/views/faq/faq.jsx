import React from 'react';
import { Card, CardBody, CardTitle, Badge } from 'reactstrap';

class FAQ extends React.Component {
    render() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-comment-text mr-2"> </i>
                    FAQ
                </CardTitle>
                <CardBody>

                    <h5 className="mb-3">Invoices</h5>

                    <p className="mb-2"><Badge color="primary">Question</Badge> I paid my invoice and my account was not activated, what happened?</p>
                    <Card className="border">
                        <CardBody>
                            The time required for the activation of your account may vary according to the speed of the network, blockchain and also some exchanges and wallets may have a longer transfer time, after this period of time has passed and your account has not been activated, contact the company through the support line.
                        </CardBody>
                    </Card>

                    <p className="mb-2"><Badge color="primary">Question</Badge> I have made the transfer but the system has not confirmed it.</p>
                    <Card className="border">
                        <CardBody>
                            After the invoice of the selected account has been made, the payment made in Bitcoin has to be processed within two hours time. Otherwise, you should contact the company through the support line.
                        </CardBody>
                    </Card>

                    <h5 className="mb-3">Earnings</h5>

                    <p className="mb-2"><Badge color="primary">Question</Badge> How long until I begin to receive earnings on my investment?</p>
                    <Card className="border">
                        <CardBody>
                            Twenty-four hours after your account has been activated.
                        </CardBody>
                    </Card>

                    <p className="mb-2"><Badge color="primary">Question</Badge> What days do I receive the daily earnings?</p>
                    <Card className="border">
                        <CardBody>
                            From Monday to Friday at 00:00 UTC.
                        </CardBody>
                    </Card>

                    <h5 className="mb-3">Withdraws</h5>

                    <p className="mb-2"><Badge color="primary">Question</Badge> What days am I able to withdraw from my account?</p>
                    <Card className="border">
                        <CardBody>
                            Tuesday and Thursday.
                        </CardBody>
                    </Card>

                    <p className="mb-2"><Badge color="primary">Question</Badge> How much can I withdraw?</p>
                    <Card className="border">
                        <CardBody>
                            There is a minimum of $50 USD with no maximum amount.
                        </CardBody>
                    </Card>

                    <p className="mb-2"><Badge color="primary">Question</Badge> What is the fee for withdraws?</p>
                    <Card className="border">
                        <CardBody>
                            5% of the amount of the withdraw
                        </CardBody>
                    </Card>

                    <p className="mb-2"><Badge color="primary">Question</Badge> How long does it take to receive my withdraw request?</p>
                    <Card className="border">
                        <CardBody>
                            Withdraws are processed in a maximum of 48 hours.
                        </CardBody>
                    </Card>

                    <h5 className="mb-3">Binary</h5>

                    <p className="mb-2"><Badge color="primary">Question</Badge> How can I receive the binary bonus?</p>
                    <Card className="border">
                        <CardBody>
                            You have to first qualify your account by having an active referral on both sides of your binary so that you may begin generating binary points.
                        </CardBody>
                    </Card>

                    <p className="mb-2"><Badge color="primary">Question</Badge> I registered a referral and did not receive the points.</p>
                    <Card className="border">
                        <CardBody>
                            See if the referred person is the first on either side of your binary because the first referral on both the right and left side do not generate binary points and are not counted in the number of accounts in your binary network, they are only for qualifying your account for binary bonuses.
                        </CardBody>
                    </Card>

                    <p className="mb-2"><Badge color="primary">Question</Badge> Was your account activated before the referred account was activated?</p>
                    <Card className="border">
                        <CardBody>
                            The binary points only are credited to you if your account was activated before the referred account was activated.
                        </CardBody>
                    </Card>

                    <p className="mb-2"><Badge color="primary">Question</Badge> I received the wrong number of points.</p>
                    <Card className="border">
                        <CardBody>
                            The points generated are 10% of the amount paid for the active plan so if one of your referral accounts upgrades his account you will receive the difference of the amount that he is upgrading to and not the total amount of the plan he selects.
                        </CardBody>
                    </Card>

                    <h5 className="mb-3">Referral Bonus</h5>

                    <p className="mb-2"><Badge color="primary">Question</Badge> My referral is active but I did not receive the bonus for the direct referral.</p>
                    <Card className="border">
                        <CardBody>
                            Always make sure that your account is activated before referring anybody to join your network.
                        </CardBody>
                    </Card>

                    <p className="mb-2"><Badge color="primary">Question</Badge> My referral is active but I did not receive the bonus for the direct referral.</p>
                    <Card className="border">
                        <CardBody>
                            Always make sure that your account is activated before referring anybody to join your network. The referral bonuses are only processed while your account is within the 300%.
                        </CardBody>
                    </Card>

                    <p className="mb-2"><Badge color="primary">Question</Badge> The amount paid for the direct referral is incorrect.</p>
                    <Card className="border">
                        <CardBody>
                            The direct referral bonus is 5% of the amount paid for the account of the referral, and if your referral account upgrades his account you will receive the difference of the amount that he is upgrading to and not the total amount of the plan he selects.
                        </CardBody>
                    </Card>

                </CardBody>
            </Card>
        )
    }
}
export default FAQ
