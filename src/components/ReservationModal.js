import React from 'react';
import CustomInput from "../react-kit/components/CustomInput/CustomInput.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "../react-kit/components/CustomButtons/Button.jsx";
import axios from "axios";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/LockOutlined";
import Phone from "@material-ui/icons/Phone";
import "../react-kit/assets/scss/material-kit-react.scss"
import Datetime, {Moment} from "react-datetime";
import * as api from "../common/Api"
class ReservationModal extends React.Component {
    state = {
        isUpdate: false,
        datetime: "",
        breadInfo: []
    };
    componentDidMount() {
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleDateChange = (value) => {
        this.setState({
            datetime: value.format('YYYY-MM-DD HH:mm')
        });
    };
    yesterday = Datetime.moment().subtract(1, 'day');
    isValid = (current) => {
        return current.isAfter(this.yesterday);
    };

    toggleUpdateReservation = () => {
        this.setState({
            isUpdate: !this.state.isUpdate,
            breadInfo: this.props.item.reservationBreads,
            datetime: this.props.item.bringTime
        });
    };

    resetUpdate = () => {
        this.setState({
            breadInfo: this.props.item.reservationBreads,
            datetime: this.props.item.bringTime
        });
    };

    handleIncrement = (e) => {
        const {breadInfo} = this.state;
        this.setState({
            breadInfo: breadInfo.map(
                item => e.target.value === item.breadName
                    ? ({...item, breadCount: item.breadCount+1})
                    : item
            )
        });
    };
    handleDecrement = (e) => {
        const {breadInfo} = this.state;
        this.setState({
            breadInfo: breadInfo.map(
                item => e.target.value === item.breadName
                    ? ({...item, breadCount: item.breadCount-1})
                    : item
            )
        });
    };
    handleDelItem = (e) => {
        const {breadInfo} = this.state;
        this.setState({
            breadInfo: breadInfo.filter(item => item.breadName !== e.target.value)
        });
    };

    putReservation = () => {
        axios.put('http://15.164.57.47:8080/olive/reservation',{
            headers: { 'Content-type': 'application/json', },
            "reservationId": this.props.item.reservationId,
            "reservationSaveRequest": {
                "breadInfo": this.state.breadInfo,
                "bringTime": this.state.datetime,
                "userEmail": this.props.email
            }
        }).then(response => {
            if(response.status===200) {
                this.props.addAlert('예약정보 수정완료');
                this.props.resetTable();
                this.props.onClose();
                //this.toggleUpdateReservation();
            }
        });
    };
    putReservationState = () => {
        api.updateReservatioinState(this.props.item.reservationId).then(response => {
            if(response.status===200) {
                this.props.addAlert('예약상태 수정완료');
                this.props.resetTable();
                this.props.onClose();
            }});
    };
    
    delReservation = () => {
        axios.delete(`http://15.164.57.47:8080/olive/reservation/${this.props.item.reservationId}`,{
            headers: { 'Content-type': 'application/json', },
        }).then(response => {
            if(response.status===200) {
                this.props.addAlert('예약 삭제완료');
                this.props.resetTable();
                this.props.onClose();
            }
        });

    };

    render() {
        const {item, isAdmin, type} = this.props;
        const {isUpdate, breadInfo} = this.state;
        if(this.props.isOpen===false)
            return null;
        return (
            <React.Fragment>
                <Dialog
                    open={this.props.isOpen}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    {
                        isUpdate===false
                        ?
                        <React.Fragment>
                            <DialogTitle id="form-dialog-title">예약 정보({item.memberName})</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <React.Fragment>
                                        {
                                            item.reservationBreads.map((item, index)=>(
                                                <p key={index}>{item.breadName} : {item.breadCount}개</p>
                                            ))
                                        }
                                        <p>{item.price}</p>
                                        <p>수령시간: {item.bringTime}</p>
                                        <p>예약시간: {item.reservationTime}</p>
                                        <p>수령인: {item.memberName}</p>
                                    </React.Fragment>
                                </DialogContentText>
                            </DialogContent>
                            {
                                isAdmin===true
                                    ?
                                    <DialogActions>
                                        <Button onClick={this.props.onClose} color="rose" simple size="lg">
                                            닫기
                                        </Button>
                                        <Button color="rose" onClick={this.delReservation} simple size="lg">
                                            예약 삭제
                                        </Button>
                                        <Button color="primary" onClick={this.putReservationState} simple size="lg">
                                            예약 상태 수정
                                        </Button>
                                    </DialogActions>
                                    :
                                    (
                                        type==='REQUEST'
                                        ?
                                            <DialogActions>
                                                <Button onClick={this.props.onClose} color="rose" simple size="lg">
                                                    닫기
                                                </Button>
                                                <Button color="rose" onClick={this.delReservation} simple size="lg">
                                                    예약 삭제
                                                </Button>
                                                <Button color="primary" onClick={this.toggleUpdateReservation} simple size="lg">
                                                    예약 수정
                                                </Button>
                                            </DialogActions>
                                        :
                                        (
                                            type==='COMPLETE'
                                            ?
                                                <DialogActions>
                                                    <Button onClick={this.props.onClose} color="rose" simple size="lg">
                                                        닫기
                                                    </Button>
                                                    <Button color="rose" onClick={this.delReservation} simple size="lg">
                                                        예약 삭제
                                                    </Button>
                                                </DialogActions>
                                            :
                                                <DialogActions>
                                                    <Button onClick={this.props.onClose} color="rose" simple size="lg">
                                                        닫기
                                                    </Button>
                                                </DialogActions>
                                        )
                                    )
                            }
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <DialogTitle id="form-dialog-title">예약 정보 수정</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <React.Fragment>
                                        {
                                            breadInfo.map((item, index)=>(
                                                <p key={index}>{item.breadName}
                                                    <button value={item.breadName} onClick={this.handleIncrement}>증가</button>
                                                    {item.breadCount}
                                                    <button value={item.breadName} onClick={this.handleDecrement}>감소</button>
                                                    <button value={item.breadName} onClick={this.handleDelItem}>삭제</button>
                                                </p>
                                            ))
                                        }
                                        <Datetime
                                            inputProps={{ placeholder: "클릭하세요", id: "datetimepicker"}}
                                            isValidDate={this.isValid}
                                            defaultValue={this.state.datetime}
                                            dateFormat="YYYY-MM-DD"
                                            timeFormat="HH:mm"
                                            onChange={this.handleDateChange}
                                        />
                                    </React.Fragment>
                                </DialogContentText>
                            </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.toggleUpdateReservation} color="rose" simple size="lg">
                                        취소
                                    </Button>
                                    <Button onClick={this.resetUpdate} color="info" simple size="lg">
                                        초기화
                                    </Button>
                                    <Button color="primary" onClick={this.putReservation} simple size="lg">
                                        예약 수정
                                    </Button>
                                </DialogActions>
                        </React.Fragment>
                    }
                </Dialog>
            </React.Fragment>
        );
    }
}

export default ReservationModal;
