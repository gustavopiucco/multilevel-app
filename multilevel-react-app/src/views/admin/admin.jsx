import React from "react";
import AdminActivateLeader from "../../components/dashboard/admin/activateleader";
import ChangeLeaderPlan from "../../components/dashboard/admin/changeleaderplan";
import ChangeUser from "../../components/dashboard/admin/changeuser";
import ResetOTP from "../../components/dashboard/admin/resetotp";
import ActivateUser from "../../components/dashboard/admin/activateuser";
import SearchUser from "../../components/dashboard/admin/searchuser";

class Admin extends React.Component {
    componentDidMount() {
        if (localStorage.getItem('email') !== 'contact@Multilevel.com')
            window.location = '/login'
    }

    render() {
        return (
            <React.Fragment>
                <ActivateUser />
                <AdminActivateLeader />
                <ChangeLeaderPlan />
                <ChangeUser />
                <ResetOTP />
                <SearchUser />
            </React.Fragment>
        )
    }
}

export default Admin;