import React, { Component } from 'react';
import logo from './olive_bakery_img_etc/olive.png';
import Header from "./react-kit/components/Header/Header.jsx";
import HeaderLinks from "./react-kit/components/Header/HeaderLinks.jsx";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import {Route} from 'react-router-dom';
import {HomePage, MyPagePage, ProductsPage, SignInPage, AdminProductsPage, AdminBoardPage, AdminUsersPage, AdminReservationPage, BoardPage, AdminDashboardPage} from "./Page/router";
import handleScroll from "./components/Products";
import Alert from "./components/Alert";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import storage from "./storage";
import * as alertActions from "./store/modules/alert";

const drawerWidth = 300;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '10px 10px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    content: {
        flexGrow: 1,
        //padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
    },
});

class App extends Component {
    state = {
        open: true
    };

    addAlert = (message) => {
        const { AlertActions } = this.props;
        AlertActions.addAlert(message);
    };

    delAlert = (message) => {
        const { AlertActions } = this.props;
        AlertActions.delAlert(message);
    };

    alert = (message, index) => {
        return (<Alert key={index} delAlert={this.delAlert} message={message}/>);
    };

    render() {
        const { classes, messages,...rest } = this.props;

        return (
            <div className="App">
                <div className={classes.root}>
                    <CssBaseline />
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open),
                        }}
                        open={this.state.open}
                    >
                        <div>
                            <img src={logo} alt="logo"/>
                        </div>
                        <Divider />
                        <List>{mainListItems}</List>
                        {
                            storage.get('logged') === null ? 
                            (
                                <Divider/>
                            ) : 
                            (
                                <List>{secondaryListItems}</List>
                            )
                        }
                    </Drawer>
                    
                    <main className={classes.content}>
                        <Header
                            absolute
                            color="transparent"
                            brand="Olive Organic Bakery"
                            rightLinks={<HeaderLinks />}
                            {...rest}
                        />
                        {
                            messages.map((msg, index) => (
                                this.alert(msg, index)
                            ))
                        }
                        <div>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/products" component={ProductsPage}/>
                            <Route exact path="/signin" component={SignInPage}/>
                            <Route exact path="/mypage" component={MyPagePage}/>
                            <Route exact path="/board" component={BoardPage}/>
                            <Route exact path="/admin/products" component={AdminProductsPage}/>
                            <Route exact path="/admin/board" component={AdminBoardPage}/>
                            <Route exact path="/admin/users" component={AdminUsersPage}/>
                            <Route exact path="/admin/reservation" component={AdminReservationPage}/>
                            <Route exact path="/admin" component={AdminDashboardPage}/>
                        </div>
                    </main>
                    
                    
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styledApp = withStyles(styles)(App);
export default connect(
    (state) => ({
        messages: state.alert.message
    }),
    (dispatch) => ({
        AlertActions: bindActionCreators(alertActions, dispatch)
    })
)(styledApp);
