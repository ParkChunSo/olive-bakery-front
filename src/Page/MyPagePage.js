import React, { Component } from 'react';
import MyPage from '../components/my-page/MyPage';
import storage from "../storage";
import { Redirect } from 'react-router-dom';
import * as alertActions from "../store/modules/alert";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class MyPagePage extends React.Component{
    addAlert = (message) => {
        const { AlertActions } = this.props;
        AlertActions.addAlert(message);
    };
    render() {
        return (
            <React.Fragment>
                {
                    storage.get('logged') == null
                        ?
                        (
                            <React.Fragment>
                                {this.addAlert('로그인이 필요합니다.')}
                                <Redirect to="/signin"/>
                            </React.Fragment>
                        )
                        :
                        (
                            <React.Fragment>
                                <MyPage addAlert={this.addAlert}/>
                            </React.Fragment>
                        )
                }
            </React.Fragment>
        );
    }
}

export default connect(
    (state) => ({
        messages: state.alert.message
    }),
    (dispatch) => ({
        AlertActions: bindActionCreators(alertActions, dispatch)
    })
)(MyPagePage);
