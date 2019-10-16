import React from 'react';
import Button from "../../react-kit/components/CustomButtons/Button.jsx";
import axios, { post } from "axios";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/LockOutlined";
import Phone from "@material-ui/icons/Phone";
import Card from "../../react-kit/components/Card/Card.jsx";
import CardBody from "../../react-kit/components/Card/CardBody.jsx";
import CardHeader from "../../react-kit/components/Card/CardHeader.jsx";
import CardFooter from "../../react-kit/components/Card/CardFooter.jsx";
import classNames from "classnames";
import checkStyles from "../../react-kit/assets/jss/material-kit-react/customCheckboxRadioSwitch";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomTabs from "../../react-kit/components/CustomTabs/CustomTabs.jsx";
import Table from "../../react-dashboard/components/Table/Table.jsx";
import Datetime, {Moment} from "react-datetime";
import "../../react-kit/assets/scss/material-kit-react.scss"
import ReservationModal from "../ReservationModal";
import storage from "../../storage";

let styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

styles = {...styles, ...checkStyles};
const token = storage.get('token');
class AdminReservation extends React.Component {
    state = {
        startDate: "",
        endDate: "",
        selectDate: "",
        request: [],
        accept: [],
        complete: [],
        isOpenForm: false,
        isOpenTable: false,
        selectedItem: {},
        checkedList: [],
        isAllCheck: false,
        reservationType: "REQUEST"
    };

    today = Datetime.moment().subtract(0, 'day').format('YYYY-MM-DD');

    componentDidMount() {
        this.postDateReservation();
    }

    handleDateChange = (value) => {
        if(typeof value==="string") {
            this.props.addAlert('클릭하세요');
            return null;
        }
        this.setState({
            selectDate: value.format('YYYY-MM-DD')
        });
    };

    postDateReservation = () => {
        let selectDate = this.state.selectDate;
        if(selectDate==='')
            selectDate = this.today;

        axios.post('http://15.164.57.47:8080/olive/reservation/date',{
            "reservationType": "REQUEST",
            "selectDate": selectDate
        },
            {headers: { 'Content-type': 'application/json', 'Authorization': token}}).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                this.setState({
                    request: response.data.map(data=>({...data, checked:'false'})),
                    checkedList: []
                });
            }
        });
        axios.post('http://15.164.57.47:8080/olive/reservation/date',{
            "reservationType": "ACCEPT",
            "selectDate": selectDate
        },
            {headers: { 'Content-type': 'application/json', 'Authorization': token}}).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                this.setState({
                    accept: response.data.map(data=>({...data, checked:'false'})),
                    checkedList: []
                });
            }
        });
        axios.post('http://15.164.57.47:8080/olive/reservation/date',{
            "reservationType": "COMPLETE",
            "selectDate": selectDate
        },
            {headers: { 'Content-type': 'application/json', 'Authorization': token}}).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                this.setState({
                    complete: response.data.map(data=>({...data, checked:'false'})),
                    checkedList: []
                });
            }
        });
    };

    putReservationState = () => {
        const {checkedList} = this.state;
        let success = '예약상태 변경 완료: ';
        let fail = '실패: ';
        checkedList.map((reservation, index, array) => (
            axios.put(`http://15.164.57.47:8080/olive/reservation/${reservation.reservationId}`,{
            },
                {headers: { 'Content-type': 'application/json', 'Authorization': token}}).then(response => {
                if(response.status===200)
                    success = success+' '+reservation.reservationId.toString();
                else
                    fail = fail+' '+reservation.reservationId.toString();
                if(index===array.length-1){
                    fail !== '실패: ' ? this.props.addAlert(success+'\n'+fail) : this.props.addAlert(success);
                    this.postDateReservation();
                }
            })
        ));
    };

    delReservation = () => {
        const {checkedList} = this.state;
        let success = '예약 삭제 완료: ';
        let fail = '실패: ';
        checkedList.map((reservation, index, array) => (
            axios.delete(`http://15.164.57.47:8080/olive/reservation/${reservation.reservationId}`,{
                    headers: { 'Content-type': 'application/json', 'Authorization': token}
            }).then(response => {
                if(response.status===200)
                    success = success+' '+reservation.reservationId.toString();
                else
                    fail = fail+' '+reservation.reservationId.toString();
                if(index===array.length-1){
                    fail !== '실패: ' ? this.props.addAlert(success+'\n'+fail) : this.props.addAlert(success);
                    this.postDateReservation();
                }
            })
        ));
    };

    toggleFormModal = () => {
        this.setState({
            isOpenForm: !this.state.isOpenForm
        });
    };

    toggleTableModal = () => {
        this.setState({
            isOpenTable: !this.state.isOpenTable
        });
    };

    handleClickRequest = (id) => {
        const {request} = this.state;
        const item = request.filter(request => request.reservationId === parseInt(id))[0];
        this.setState({
            selectedItem: {
                bringTime: item.bringTime,
                memberName: item.memberName,
                price: item.price,
                reservationBreads: item.reservationBreads,
                reservationId: item.reservationId,
                reservationTime: item.reservationTime
            }
        });
        this.toggleTableModal();
    };
    handleClickAccept = (id) => {
        const {accept} = this.state;
        const item = accept.filter(accept => accept.reservationId === parseInt(id))[0];
        this.setState({
            selectedItem: {
                bringTime: item.bringTime,
                memberName: item.memberName,
                price: item.price,
                reservationBreads: item.reservationBreads,
                reservationId: item.reservationId,
                reservationTime: item.reservationTime
            }
        });
        this.toggleTableModal();
    };
    handleClickComplete = (id) => {
        const {complete} = this.state;
        const item = complete.filter(complete => complete.reservationId === parseInt(id))[0];
        this.setState({
            selectedItem: {
                bringTime: item.bringTime,
                memberName: item.memberName,
                price: item.price,
                reservationBreads: item.reservationBreads,
                reservationId: item.reservationId,
                reservationTime: item.reservationTime
            }
        });
        this.toggleTableModal();
    };
    handleClickRequestTab = () => {
        this.setState({
            reservationType: 'REQUEST',
            chekedList: [],
            isAllCheck: false
        });
    };
    handleClickAcceptTab = () => {
        this.setState({
            reservationType: 'ACCEPT',
            chekedList: [],
            isAllCheck: false
        });
    };
    handleClickCompleteTab = () => {
        this.setState({
            reservationType: 'COMPLETE',
            chekedList: [],
            isAllCheck: false
        });
    };

    handleChangeCheckbox = (e) => {
        let {reservationType} = this.state;
        if(reservationType==="REQUEST"){
            if(e.target.checked){
                if(e.target.id==='isAllCheck') {
                    this.setState({
                        isAllCheck: true,
                        request: this.state.request.map(
                            request =>
                                ({...request, checked: 'true'})
                        ),
                        checkedList: this.state.request.map(request => request)
                    });
                }
                else {
                    this.setState({
                        checkedList: this.state.checkedList.concat(this.state.request.filter(request => request.reservationId === parseInt(e.target.id))[0]),
                        request: this.state.request.map(
                            request => request.reservationId === parseInt(e.target.id)
                                ?
                                ({...request, checked: 'true'})
                                :
                                request
                        )
                    });
                }
            }
            else{
                if(e.target.id==='isAllCheck')
                    this.setState({
                        isAllCheck : false,
                        request: this.state.request.map(
                            request =>
                                ({...request, checked: 'false'})
                        ),
                        checkedList: []
                    });
                else
                    this.setState({
                        checkedList: this.state.checkedList.filter(request => request.reservationId!==parseInt(e.target.id)),
                        request: this.state.request.map(
                            request => request.reservationId===parseInt(e.target.id)
                                ?
                                ({...request, checked: 'false'})
                                :
                                request
                        )
                    });
            }
        }
        else if(reservationType==='ACCEPT'){
            if(e.target.checked){
                if(e.target.id==='isAllCheck') {
                    this.setState({
                        isAllCheck: true,
                        accept: this.state.accept.map(
                            accept =>
                                ({...accept, checked: 'true'})
                        ),
                        checkedList: this.state.accept.map(accept => accept)
                    });
                }
                else {
                    this.setState({
                        checkedList: this.state.checkedList.concat(this.state.accept.filter(accept => accept.reservationId === parseInt(e.target.id))[0]),
                        accept: this.state.accept.map(
                            accept => accept.reservationId === parseInt(e.target.id)
                                ?
                                ({...accept, checked: 'true'})
                                :
                                accept
                        )
                    });
                }
            }
            else{
                if(e.target.id==='isAllCheck')
                    this.setState({
                        isAllCheck : false,
                        accept: this.state.accept.map(
                            accept =>
                                ({...accept, checked: 'false'})
                        ),
                        checkedList: []
                    });
                else
                    this.setState({
                        checkedList: this.state.checkedList.filter(accept => accept.reservationId!==parseInt(e.target.id)),
                        accept: this.state.accept.map(
                            accept => accept.reservationId===parseInt(e.target.id)
                                ?
                                ({...accept, checked: 'false'})
                                :
                                accept
                        )
                    });
            }
        }
        else{
            if(e.target.checked){
                if(e.target.id==='isAllCheck') {
                    this.setState({
                        isAllCheck: true,
                        complete: this.state.complete.map(
                            complete =>
                                ({...complete, checked: 'true'})
                        ),
                        checkedList: this.state.complete.map(complete => complete)
                    });
                }
                else {
                    this.setState({
                        checkedList: this.state.checkedList.concat(this.state.complete.filter(complete => complete.reservationId === parseInt(e.target.id))[0]),
                        complete: this.state.complete.map(
                            complete => complete.reservationId === parseInt(e.target.id)
                                ?
                                ({...complete, checked: 'true'})
                                :
                                complete
                        )
                    });
                }
            }
            else{
                if(e.target.id==='isAllCheck')
                    this.setState({
                        isAllCheck : false,
                        complete: this.state.complete.map(
                            complete =>
                                ({...complete, checked: 'false'})
                        ),
                        checkedList: []
                    });
                else
                    this.setState({
                        checkedList: this.state.checkedList.filter(complete => complete.reservationId!==parseInt(e.target.id)),
                        complete: this.state.complete.map(
                            complete => complete.reservationId===parseInt(e.target.id)
                                ?
                                ({...complete, checked: 'false'})
                                :
                                complete
                        )
                    });
            }
        }
    };

    render() {
        const { classes } = this.props;
        const { request, accept, complete} = this.state;
        const wrapperDiv = classNames(
            classes.checkboxAndRadio,
            classes.checkboxAndRadioHorizontal
        );
        const r = request.map(request => (
            [request.reservationId.toString(), request.price.toString(), request.bringTime, request.reservationTime, request.checked]
        ));
        const a = accept.map(accept => (
            [accept.reservationId.toString(), accept.price.toString(), accept.bringTime, accept.reservationTime, accept.checked]
        ));
        const c = complete.map(complete => (
            [complete.reservationId.toString(), complete.price.toString(), complete.bringTime, complete.reservationTime, complete.checked]
        ));
        return (
            <React.Fragment>
                <ReservationModal
                    isOpen={this.state.isOpenTable}
                    onClose={this.toggleTableModal}
                    item={this.state.selectedItem}
                    resetTable={this.postDateReservation}
                    isAdmin={true}
                    addAlert={this.props.addAlert}
                />
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>예약 관리</h4>
                        <p className={classes.cardCategoryWhite}>
                            예약 확인
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Datetime
                            inputProps={{ placeholder: "클릭하세요", id: "datetimepicker"}}
                            dateFormat="YYYY-MM-DD"
                            timeFormat=""
                            onChange={this.handleDateChange}
                            closeOnSelect={true}
                        />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <Button color="primary" onClick={this.postDateReservation} simple size="lg">
                            예약 확인
                        </Button>
                    </CardFooter>
                </Card>
                <CustomTabs
                    headerColor="primary"
                    tabs={[
                        {
                            onClick: this.handleClickRequestTab,
                            tabName: '예약 중',
                            tabContent: (
                                <React.Fragment>
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["번호", "금액", "수령시간", "예약시간"]}
                                        tableData={
                                            r
                                        }
                                        type="modal"
                                        isAdmin={true}
                                        handleClickOpen={this.handleClickRequest}
                                        handleChangeCheckbox={this.handleChangeCheckbox}
                                        isAllCheck={this.state.isAllCheck}
                                    />
                                    <Button color="rose" onClick={this.delReservation} simple size="lg">
                                        예약 삭제
                                    </Button>
                                    <Button color="primary" onClick={this.putReservationState} simple size="lg">
                                        예약 상태 수정
                                    </Button>
                                </React.Fragment>
                            )
                        },
                        {
                            onClick: this.handleClickAcceptTab,
                            tabName: '예약완료',
                            tabContent: (
                                <React.Fragment>
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["번호", "금액", "수령시간", "예약시간"]}
                                        tableData={
                                            a
                                        }
                                        type="modal"
                                        isAdmin={true}
                                        handleClickOpen={this.handleClickAccept}
                                        handleChangeCheckbox={this.handleChangeCheckbox}
                                        isAllCheck={this.state.isAllCheck}
                                    />
                                    <Button color="rose" onClick={this.delReservation} simple size="lg">
                                        예약 삭제
                                    </Button>
                                    <Button color="primary" onClick={this.putReservationState} simple size="lg">
                                        예약 상태 수정
                                    </Button>
                                </React.Fragment>
                            )
                        },
                        {
                            onClick: this.handleClickCompleteTab,
                            tabName: '수령',
                            tabContent: (
                                <React.Fragment>
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["번호", "금액", "수령시간", "예약시간"]}
                                        tableData={
                                            c
                                        }
                                        type="modal"
                                        isAdmin={true}
                                        handleClickOpen={this.handleClickComplete}
                                        handleChangeCheckbox={this.handleChangeCheckbox}
                                        isAllCheck={this.state.isAllCheck}
                                    />
                                    <Button color="rose" onClick={this.delReservation} simple size="lg">
                                        예약 삭제
                                    </Button>
                                    <Button color="primary" onClick={this.putReservationState} simple size="lg">
                                        예약 상태 수정
                                    </Button>
                                </React.Fragment>
                            )
                        }
                    ]}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AdminReservation);
