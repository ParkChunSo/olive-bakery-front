import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "../react-kit/components/Card/Card.jsx";
import CardBody from "../react-kit/components/Card/CardBody.jsx";
import Button from "../react-kit/components/CustomButtons/Button.jsx";

import storage from "../storage";

import imagesStyles from "../react-kit/assets/jss/material-kit-react/imagesStyles.jsx";

import { cardTitle } from "../react-kit/assets/jss/material-kit-react.jsx";
import "../react-kit/assets/scss/material-kit-react.scss"
import Datetime, {Moment} from "react-datetime";
import axios from "axios";


const style = {
    ...imagesStyles,
    cardTitle,
    label: {
        cursor: "pointer",
        paddingLeft: "0",
        color: "rgba(0, 0, 0, 0.26)",
        fontSize: "14px",
        lineHeight: "1.428571429",
        fontWeight: "400",
        display: "inline-flex"
    },
};

let email = null;

class ShoppingCart extends React.Component {
    state = {
        datetime: "",
        dayValid: 0,
        timeValid: 0,
        timeIsValid: false
    };

    handleIncrement = (e) => {
        const {increment, itemlist} = this.props;
        increment(e.target.value);
        console.log(itemlist);
    };
    handleDecrement = (e) => {
        const {decrement} = this.props;
        decrement(e.target.value);
    };
    handleDelItem = (e) => {
        const {delItem} = this.props;
        delItem(e.target.value);
    };
    postReservation = () => {
        const {timeValid, dayValid, datetime} = this.state;

        if(timeValid<1000 || timeValid>2000 ){
            console.log(timeValid);
            this.props.addAlert('빵 수령시간이 잘못되었습니다. 수령시간은 10시-20시입니다');
            return null;
        }

        this.email = storage.get('email');
        const token = storage.get('token');
        const {itemlist} = this.props;
        
        axios.post('http://15.164.57.47:8080/olive/reservation', {
            "breadInfo": itemlist.map(item => ({"breadCount": item.count, "breadName": item.name})),
            "bringTime": datetime,
            "userEmail": this.email
        },
            {headers: { 'Content-type': 'application/json', 'Authorization': token}}).then(response => {
            if(response.status===200) {
                this.props.addAlert('예약 완료');
            }
        });

    };

    handleDateChange = (value) => {
        if(typeof value==="string") {
            this.props.addAlert('클릭하세요');
            return null;
        }
        let date = value.format('YYYY-MM-DD HH:mm');
        let day = parseInt(date.substring(5,7));
        let hour = date.substring(11,13);
        let min = date.substring(14,16);
        let time = parseInt(hour + min);

        this.setState({
            datetime: date,
            dayValid: day,
            timeValid: time,
            timeIsValid: false
        });
        // if(time<1000 || time>2000 ){
        //     this.props.addAlert('예약시간이 잘못되었습니다. 수령시간은 10시-20시입니다');
            
        // }
        // else{
        //     this.setState({
        //         datetime: date,
        //         timeIsValid: true
        //     });
        // }
    };

    yesterday = Datetime.moment().subtract(1, 'day');
    isValid = (current) => {
        return current.isAfter(this.yesterday);
    };
    render() {
        const { classes, itemlist, tot } = this.props;
        const { handleIncrement, handleDecrement, handleDelItem} = this;
        return (
            <Card style={{width: "90%", marginLeft: "5%"}}>
                {/*<img
                    style={{height: "180px", width: "100%", display: "block"}}
                    className={classes.imgCardTop}
                    src="..."
                    alt="Card-img-cap"
                />*/}
                <CardBody>
                    <h4 className={classes.cardTitle}>장바구니</h4>
                    <p>원하는 갯수만큼 추가하세요</p>
                    {
                        itemlist.map(item =>
                            <p key={item.name}>{item.name}
                                <button value={item.name} onClick={handleIncrement}>증가</button>
                                {item.count}
                                <button value={item.name} onClick={handleDecrement}>감소</button>
                                ({item.price*item.count}원)
                                <button value={item.name} onClick={handleDelItem}>삭제</button>
                            </p>
                        )
                    }
                    <p>
                        total: {tot}
                    </p>
                    <Datetime
                        inputProps={{ placeholder: "클릭하세요", id: "datetimepicker"}}
                        isValidDate={this.isValid}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        onChange={this.handleDateChange}
                    />
                    <Button color="primary" onClick={this.postReservation}>
                        예약하기
                    </Button>
                </CardBody>
            </Card>
        );
    }
}

export default withStyles(style)(ShoppingCart);
