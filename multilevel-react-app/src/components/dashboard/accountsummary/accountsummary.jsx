import React from "react"
import { Card, CardBody, CardTitle, Input, Button, InputGroupAddon, InputGroup } from 'reactstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ApiService from '../../../services/api'
import { Translate } from 'react-i18nify'

import imgNoPlan from '../../../assets/images/binary/avatar_noplan.jpg'
import imgBT100 from '../../../assets/images/binary/avatar_bt100.jpg'
import imgBT500 from '../../../assets/images/binary/avatar_bt500.jpg'
import imgBT1000 from '../../../assets/images/binary/avatar_bt1000.jpg'
import imgBT2500 from '../../../assets/images/binary/avatar_bt2500.jpg'
import imgBT5000 from '../../../assets/images/binary/avatar_bt5000.jpg'
import imgBT12500 from '../../../assets/images/binary/avatar_bt12500.jpg'
import imgBT25000 from '../../../assets/images/binary/avatar_bt25000.jpg'
import imgBT50000 from '../../../assets/images/binary/avatar_bt50000.jpg'

import imgPinNone from '../../../assets/images/careerplan/pin_none.png'
import imgPinBronze from '../../../assets/images/careerplan/pin_bronze.png'
import imgPinSilver from '../../../assets/images/careerplan/pin_silver.png'
import imgPinGold from '../../../assets/images/careerplan/pin_gold.png'
import imgPinRuby from '../../../assets/images/careerplan/pin_ruby.png'
import imgPinEmerald from '../../../assets/images/careerplan/pin_emerald.png'
import imgPinDiamond from '../../../assets/images/careerplan/pin_diamond.png'
import imgPinDoubleDiamond from '../../../assets/images/careerplan/pin_double_diamond.png'
import imgPinTripleDiamond from '../../../assets/images/careerplan/pin_triple_diamond.png'
import imgPinBlackDiamond from '../../../assets/images/careerplan/pin_black_diamond.png'

class AccountSummary extends React.Component {
    constructor(props) {
        super(props)
        
        this.changeBinarySide = this.changeBinarySide.bind(this)

        this.state = {
            binarySide: props.user.binary_side
        }
    }

    async changeBinarySide(side) {
        const response = await ApiService.put('/user/binaryside', { binarySide: side })

        if (response.ok) {
            this.setState({ binarySide: side })
        }
    }

    renderPlan() {
        let planId, planImg, planName

        if (this.props.user) {
            planId = this.props.user.plan_id
        }

        switch (planId) {
            case 1:
                planImg = imgBT100
                planName = 'BT-100'
                break;
            case 2:
                planImg = imgBT500
                planName = 'BT-500'
                break;
            case 3:
                planImg = imgBT1000
                planName = 'BT-1000'
                break;
            case 4:
                planImg = imgBT2500
                planName = 'BT-2500'
                break;
            case 5:
                planImg = imgBT5000
                planName = 'BT-5000'
                break;
            case 6:
                planImg = imgBT12500
                planName = 'BT-12500'
                break;
            case 7:
                planImg = imgBT25000
                planName = 'BT-25000'
                break;
            case 8:
                planImg = imgBT50000
                planName = 'BT-50000'
                break;
            default:
                planImg = imgNoPlan
                planName = 'None'
                break;
        }

        return (
            <React.Fragment>
                <img src={planImg} alt={planName} width="75" />
                <span className="ml-2">{planName}</span>
            </React.Fragment>
        )
    }

    renderCareerPlan() {
        const career_plan = this.props.user && this.props.user.career_plan
        let img;

        switch (career_plan) {
            case 1:
                img = imgPinBronze
                break
            case 2:
                img = imgPinSilver
                break
            case 3:
                img = imgPinGold
                break
            case 4:
                img = imgPinRuby
                break
            case 5:
                img = imgPinEmerald
                break
            case 6:
                img = imgPinDiamond
                break
            case 7:
                img = imgPinDoubleDiamond
                break
            case 8:
                img = imgPinTripleDiamond
                break
            case 9:
                img = imgPinBlackDiamond
                break
            default:
                img = imgPinNone
                break
        }

        return (
            <React.Fragment>
                <img src={img} alt='Career Plan' width="85" />
            </React.Fragment>
        )
    }

    render() {
        const { user } = this.props;
        let invite_link = process.env.REACT_APP_URL + '/register/' + user.invite_hash
        let binarySideName = this.state.binarySide === 'left' ? 'Left' : 'Right'

        return (
            <Card className="card-hover">
                <CardBody>
                    <CardTitle><Translate value="dashboard.account_summary.title" /></CardTitle>
                    <table className="mt-4 table no-border mini-table m-t-20">
                        <tbody>
                            <tr>
                                <td><i className="mr-2 mdi mdi-worker"></i><Translate value="dashboard.account_summary.username" /></td>
                                <td className="font-medium">{user.username}</td>
                            </tr>
                            <tr>
                                <td><i className="mr-2 mdi mdi-arrow-compress"></i><Translate value="dashboard.account_summary.default_binary_side" /></td>
                                <td className="font-medium">{binarySideName}
                                    <Button onClick={() => this.changeBinarySide('left')} disabled={this.state.binarySide === 'left'} className="text-white ml-2 mr-2" color="secondary">Left Team<i class="mdi mdi-arrow-left"></i></Button>
                                    <Button onClick={() => this.changeBinarySide('right')} disabled={this.state.binarySide === 'right'}  className="text-white" color="secondary"><i class="mdi mdi-arrow-right"></i>Right Team</Button>
                                </td>
                            </tr>
                            <tr>
                                <td><i className="mr-2 mdi mdi-file-tree"></i><Translate value="dashboard.account_summary.binary_qualified" /></td>
                                <td className="font-medium">
                                    {user.qualified ? <Translate value="dashboard.account_summary.yes" /> : <Translate value="dashboard.account_summary.no" />}
                                </td>
                            </tr>
                            <tr>
                                <td><i className="mr-2 mdi mdi-link-variant"></i><Translate value="dashboard.account_summary.invite_link" /></td>
                                <td className="font-medium">
                                    <InputGroup>
                                        <Input type="text" defaultValue={invite_link} readOnly />
                                        < InputGroupAddon addonType="append">
                                            <CopyToClipboard text={invite_link}>
                                                <Button className="text-white" color="primary"><Translate value="dashboard.account_summary.copy" /></Button>
                                            </CopyToClipboard>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td><i className="mr-2 mdi mdi-vector-polygon"></i><Translate value="dashboard.account_summary.plan" /></td>
                                <td className="font-medium">
                                    {this.renderPlan()}
                                </td>
                            </tr>
                            <tr>
                                <td><i className="mr-2 mdi mdi-star-circle"></i><Translate value="dashboard.account_summary.career_plan" /></td>
                                <td className="font-medium">
                                    {this.renderCareerPlan()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        );
    }
}

export default AccountSummary;