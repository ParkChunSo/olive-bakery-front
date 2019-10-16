import React, { Component } from 'react';
import SignInForm from '../components/SignInForm';
import {connect} from 'react-redux';
import * as authActions from '../store/modules/auth';
import storage from "../storage";
import { Redirect } from 'react-router-dom';
import {bindActionCreators} from "redux";
import * as alertActions from "../store/modules/alert";

class SignInPage extends Component{
    handleSaveToken = (tok) => {
       const {AuthActions} = this.props;
        AuthActions.saveToken(tok);
    };
    addAlert = (message) => {
        const { AlertActions } = this.props;
        AlertActions.addAlert(message);
    };
    render(){
        const {handleSaveToken} = this;
        const {token} = this.props;

        return (
            <React.Fragment>
                {
                    storage.get('logged')==null
                    ?
                    (
                        <SignInForm
                            saveToken={handleSaveToken}
                            token ={token}
                            addAlert={this.addAlert}
                        />
                    )
                    :
                    (
                        <Redirect to="/"/>
                    )
                }
            </React.Fragment>
        );
    }
}
export default connect(
    (state) => ({
        token: state.auth.token,
        messages: state.alert.message
    }),
    (dispatch) => ({
        AlertActions: bindActionCreators(alertActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(SignInPage);
