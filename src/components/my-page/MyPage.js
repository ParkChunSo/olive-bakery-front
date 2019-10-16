import React from 'react';
import Button from "../../react-kit/components/CustomButtons/Button.jsx";
import Card from "../../react-kit/components/Card/Card.jsx";
import CardBody from "../../react-kit/components/Card/CardBody.jsx";
import CardHeader from "../../react-kit/components/Card/CardHeader.jsx";
import CardFooter from "../../react-kit/components/Card/CardFooter.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomTabs from "../../react-kit/components/CustomTabs/CustomTabs.jsx";
import Table from "../../react-dashboard/components/Table/Table.jsx";

import ReservationModal from "../ReservationModal";
import MyPageModal from "./MyPageModal";
import Profile from "./Profile";

import * as api from "../../common/Api";

const styles = {
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


class MyPage extends React.Component {
    state = {
        request: [],
        accept: [],
        complete: [],
        selectedItem: null,
        isOpenForm: false,
        isOpenTable: false,
        reservationType: 'REQUEST',
        userData: {}
    };

    componentDidMount() {
        this.getReservation();
        this.getUserData();
    }

    getReservation = async () => {
        let request = await api.getReservationDataByUser("REQUEST");
        let accept = await api.getReservationDataByUser("ACCEPT");
        let complete = await api.getReservationDataByUser("COMPLETE");
        if(request === undefined || request === null || request === ""){
            request = [];
        }
        if(accept === undefined || accept === null || accept === ""){
            accept = [];
        }
        if(complete === undefined || complete === null || complete === ""){
            complete = [];
        }
        this.setState({
            request: request,
            accept: accept,
            complete: complete
        })
    };

    getUserData = async () => {
        let userData = await api.getUserData();
        if(userData === undefined || userData === null || userData === ""){
            userData = {};
        }
        
        this.setState({
            userData: userData
        })
    }

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
            reservationType: 'REQUEST'
        });
    };
    handleClickAcceptTab = () => {
        this.setState({
            reservationType: 'ACCEPT'
        });
    };
    handleClickCompleteTab = () => {
        this.setState({
            reservationType: 'COMPLETE'
        });
    };

    render() {
        const { classes } = this.props;
        const { request, accept, complete } = this.state;
        const {userData} = this.state;

        const r = request.map(request => (
            [request.reservationId.toString(), request.price.toString(), request.bringTime, request.reservationTime]
        ));
        const a = accept.map(accept => (
            [accept.reservationId.toString(), accept.price.toString(), accept.bringTime, accept.reservationTime]
        ));
        const c = complete.map(complete => (
            [complete.reservationId.toString(), complete.price.toString(), complete.bringTime, complete.reservationTime]
        ));
        return (
            <React.Fragment>
                <ReservationModal
                    isOpen={this.state.isOpenTable}
                    onClose={this.toggleTableModal}
                    item={this.state.selectedItem}
                    isAdmin={false}
                    resetTable={this.getReservation}
                    type={this.state.reservationType}
                    addAlert={this.props.addAlert}
                />
                <MyPageModal
                    isOpen={this.state.isOpenForm}
                    onClose={this.toggleFormModal}
                    addAlert={this.props.addAlert}
                    userData= {userData}
                />
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>프로필</h4>
                        <p className={classes.cardCategoryWhite}>
                            프로필 수정하시겠어요?
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Profile userData={userData} />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <Button color="primary" onClick={this.toggleFormModal} simple size="lg">
                            프로필 수정
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
                                        handleClickOpen={this.handleClickRequest}
                                    />
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
                                        handleClickOpen={this.handleClickAccept}
                                    />
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
                                        handleClickOpen={this.handleClickComplete}
                                    />
                                </React.Fragment>
                            )
                        }
                    ]}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MyPage);
