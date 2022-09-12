import React from "react"
import { Card, CardBody, CardTitle } from 'reactstrap'
import { Translate } from 'react-i18nify'
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

class CareerPlan extends React.Component {
    getCareerPlanImg() {
        const career_points = this.props.user && this.props.user.career_points
        
        if (career_points >= 50000 && career_points < 100000)
            return imgPinBronze
        else if (career_points >= 100000 && career_points < 250000)
            return imgPinSilver
        else if (career_points >= 250000 && career_points < 500000)
            return imgPinGold
        else if (career_points >= 500000 && career_points < 1000000)
            return imgPinRuby
        else if (career_points >= 1000000 && career_points < 2500000)
            return imgPinEmerald
        else if (career_points >= 2500000 && career_points < 5000000)
            return imgPinDiamond
        else if (career_points >= 5000000 && career_points < 12500000)
            return imgPinDoubleDiamond
        else if (career_points >= 12500000 && career_points < 50000000)
            return imgPinTripleDiamond
        else if (career_points >= 50000000)
            return imgPinBlackDiamond
        else
            return imgPinNone
    }

    render() {
        return (
            <Card className="card-hover">
                <CardBody>
                    <CardTitle><Translate value="dashboard.career_plan.title" /></CardTitle>
                    <img src={this.getCareerPlanImg()} className="img-fluid" alt="Career Plan" />
                </CardBody>
            </Card>
        )
    }
}

export default CareerPlan