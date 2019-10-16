import React, { Component } from 'react';
import Products from '../components/Products';
import SectionCarousel from '../components/SectionCarousel';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as alertActions from "../store/modules/alert";

class ProductsPage extends React.Component{
    addAlert = (message) => {
        const { AlertActions } = this.props;
        AlertActions.addAlert(message);
    };
    render() {
        return (
            <React.Fragment>
                <SectionCarousel/>
                <Products addAlert={this.addAlert}/>
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
)(ProductsPage);
