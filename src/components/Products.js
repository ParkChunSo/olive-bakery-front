import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


import Card from "../react-kit/components/Card/Card.jsx";
import CardBody from "../react-kit/components/Card/CardBody.jsx";
import CardHeader from "../react-kit/components/Card/CardHeader.jsx";
import Button from "../react-kit/components/CustomButtons/Button.jsx";

import imagesStyles from "../react-kit/assets/jss/material-kit-react/imagesStyles.jsx";

import { cardTitle } from "../react-kit/assets/jss/material-kit-react.jsx";

import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import CustomTabs from "../react-kit/components/CustomTabs/CustomTabs.jsx"
import cardHeaderStyle from "../react-kit/assets/jss/material-kit-react/components/cardHeaderStyle";
import ShoppingCart from "./ShoppingCart";
import BreadModal from "./BreadModal";

import {connect} from 'react-redux';

import { bindActionCreators } from "redux";
import * as cartActions from "../store/modules/cart";
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import {Animate} from 'react-move';
import {easeExpOut} from 'd3-ease';
import ReactDom from "react-dom";
import axios from "axios";
import Pulse from 'react-reveal/Pulse';

import bimg1 from '../olive_bakery_img_etc/식빵.jpg';
import bimg2 from '../olive_bakery_img_etc/단팥빵.jpg';
import bimg3 from '../olive_bakery_img_etc/마늘빵.jpg';
import bimg4 from '../olive_bakery_img_etc/소보로빵.JPG';

const bimg = [bimg1,bimg2, bimg3, bimg4];

const style = {
    ...imagesStyles,
    cardTitle,
};

const styles = theme => ({
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 1}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    content: {
        width: '80%',
        float: 'left'
    },
    right: {
        position: 'relative',
        width: '20%',
        float: 'left'
    }
});

class Products extends React.Component {
    state = {
        bread: [],
        MON: [],
        TUE: [],
        WED: [],
        THU: [],
        FRI: [],
        SAT: [],
        SUN: [],
        isOpen: false,
        selectedItem: {},
        divY: 0,
        tab: 0
    };
    dayTypes = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    cart = null;
    tab = null;
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
        this.getBread();
        this.dayTypes.map(day => (
            this.getDayBread(day)
        ));
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, true);
    }
    handleScroll = () => {
        if(this.tab.getBoundingClientRect().y<=0) {
            this.setState({
                divY: this.cart.getBoundingClientRect().y,
                tab: this.tab.getBoundingClientRect().y
            });
        }
    };

    handleAddItem = (e) => {
        const { CartActions } = this.props;
        const { bread } = this.state;
        let item = bread.filter(bread => bread.name === e.currentTarget.value)[0];
        //console.log(e.target.getAttribute());
        console.log(e.currentTarget.value);
        console.log(item);
        item = {...item, count: 1};
        if(item.length !== null)
            CartActions.addItem(item);
    };
    handleDecrement = (name) => {
        const { CartActions } = this.props;
        CartActions.decrement(name);
    };
    handleIncrement = (name) => {
        const { CartActions } = this.props;
        CartActions.increment(name);
    };
    handleDelItem = (name) => {
        const { CartActions } = this.props;
        CartActions.delItem(name);
    };
    toggleModal = () => {
        this.setState({
           isOpen: !this.state.isOpen
        });
    };
    handleClickOpen = (name) => {
        axios.get(`http://15.164.57.47:8080/olive/bread/name/${name}`, {
            headers: { 'Content-type': 'application/json', },
        }).then(response => {
            //this.props.onReceive(response.data.number);
            console.log(response.data);
            this.setState({
                selectedItem: response.data
            });
            this.toggleModal();
        });
    };

    handlePulse = (name) => {
        console.log(name);
        this.setState({
            bread: this.state.bread.map(bread=> (bread.name===name?{count: bread.count+1, ...bread}:bread))
        });
    };

    checkPulse = (name) => {
        const {bread} = this.state;

    };

    getDayBread = (day) => {
        axios.get(`http://15.164.57.47:8080/olive/bread/day/${day}`
        ).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                this.setState({
                    [day]: response.data.filter(data=> data.isSoldOut===false)
                });
            }
        });
    };

    getBread = () => {
        axios.get(`http://15.164.57.47:8080/olive/bread`
        ).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                console.log('알림창 추가하자');
                let b = response.data.filter(data=> data.isSoldOut===false);
                this.setState({
                    bread: b.map(bread => ({count: 1, ...bread}))
                });
            }
        });
    };

    render() {
        const {classes, itemlist, tot} = this.props;
        const { bread, MON, TUE, WED, THU, FRI, SAT, SUN } = this.state;
        const {
            handleAddItem,
            handleIncrement,
            handleDecrement,
            handleDelItem
        } = this;
        const days = ['ALL', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        const breads = {ALL: bread, MON: MON, TUE: TUE, WED: WED, THU: THU, FRI: FRI, SAT: SAT, SUN: SUN};
        const recommend = bread.filter(b => b.state === "NORMAL");
        let tabs = days.map(day => (
            {
                tabName: day,
                tabIcon: Face,
                tabContent: (
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        {/* End hero unit */}
                        <Grid container spacing={40}>
                            {breads[day].map(bread => (
                                <Grid item key={bread.name} sm={6} md={4} lg={4}>
                                    <Card className={classes.card} onMouseOver={()=>this.handlePulse(bread.name)}>
                                        <CardActionArea onClick={() => this.handleClickOpen(bread.name)}>
                                            <Pulse spy={this.state.bread.filter(b=>b.name===bread.name)[0]}>
                                            <img
                                                style={{
                                                    height: "180px",
                                                    width: "100%",
                                                    display: "block"
                                                }}
                                                className={classes.imgCardTop}
                                                src={bread.imageUrl}
                                                alt="Card-img-cap"
                                            />
                                            </Pulse>
                                        </CardActionArea>
                                        <CardBody className={classes.cardContent}>
                                            <h4 className={classes.cardTitle}>{bread.name}</h4>
                                            <p>{bread.description}</p>
                                            <p>{bread.price}</p>
                                            <Button color="primary" value={bread.name} onClick={handleAddItem}>장바구니 담기</Button>
                                        </CardBody>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )}
        ));
        return (
            <React.Fragment>
                <BreadModal
                    isOpen={this.state.isOpen}
                    onClose={this.toggleModal}
                    item={this.state.selectedItem}
                    addItem={this.handleAddItem}
                    isAdmin={false}
                    addAlert={this.props.addAlert}
                />
                <CssBaseline/>
                <main>
                    <div>
                    <div className={classes.content}
                         ref={ref => {
                             this.tab = ref;
                         }}
                    >
                        <CustomTabs
                            headerColor="primary"
                            tabs={tabs}
                        />
                    </div>
                    <Animate
                        start={() => ({
                            y: 0
                        })}
                        update={() => ({
                            y: [
                                 window.innerHeight/2 -this.state.tab - this.cart.clientHeight*3/4
                            ],
                            timing: {duration: 750, ease: easeExpOut}
                        })}
                    >
                        {state => {
                            const {y} = state;
                            return (
                                <div className={classes.right}>
                                    <div
                                        ref={ref => {
                                            this.cart = ref;
                                        }}
                                        style={{
                                            float: "left",
                                            position: "absolute",
                                            transform: `translate3d(0, ${y}px, 0)`
                                        }}
                                    >
                                        <ShoppingCart
                                            itemlist={itemlist}
                                            tot={tot}
                                            increment={handleIncrement}
                                            decrement={handleDecrement}
                                            delItem={handleDelItem}
                                            addAlert={this.props.addAlert}
                                        />
                                    </div>
                                </div>
                            );
                        }}
                    </Animate>
                    </div>
                    <img src=""/>
                </main>
            </React.Fragment>
        );
    }
}

Products.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styledProducts = withStyles(styles)(Products);
export default connect(
    (state) => ({
        itemlist: state.cart.itemlist,
        tot: state.cart.tot
    }),
    (dispatch) => ({
        CartActions: bindActionCreators(cartActions, dispatch)
    })
)(styledProducts);
