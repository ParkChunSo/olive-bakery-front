import React, { Component } from 'react';
import Board from '../components/Board';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as alertActions from "../store/modules/alert";

class BoardPage extends React.Component{
    addAlert = (message) => {
        const { AlertActions } = this.props;
        AlertActions.addAlert(message);
    };
    render() {
        return (
            <React.Fragment>
                <Board addAlert={this.addAlert}/>
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
)(BoardPage);
