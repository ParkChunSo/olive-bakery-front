import React from 'react';

import axios from "axios";

import withStyles from "@material-ui/core/styles/withStyles";
import Face from "@material-ui/icons/Face";
import CustomTabs from "../../react-kit/components/CustomTabs/CustomTabs.jsx";
import Table from "../../react-dashboard/components/Table/Table.jsx";
import UserModal from "../UserModal";



import classNames from "classnames";

import checkStyles from "../../react-kit/assets/jss/material-kit-react/customCheckboxRadioSwitch";
import Button from "../../react-kit/components/CustomButtons/Button.jsx";

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


class AdminUsers extends React.Component {
    state = {
        users: [],
        isOpen: false,
        selectedItem: null,
        checkedList: [],
        isAllCheck: false
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        axios.get('http://15.164.57.47:8080/olive/sign/members/'
        ).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                this.setState({
                    users: response.data.map(data=>({...data, checked:'false'}))
                });
            }
        });
    };

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    handleClickOpen = (id) => {
        const {users} = this.state;
        const item = users.filter(user => user.email === id)[0];
        this.setState({
            selectedItem: item
        });
        this.toggleModal();
    };

    handleChangeCheckbox = (e) => {
        console.log(this.state.checkedList);
        if(e.target.checked){
            if(e.target.id==='isAllCheck')
                this.setState({
                    isAllCheck : true,
                    users: this.state.users.map(
                        user =>
                            ({...user, checked: 'true'})
                    ),
                    checkedList: this.state.users.map(user=> user)
                });
            else
                this.setState({
                    checkedList: this.state.checkedList.concat(this.state.users.filter(user => user.email===e.target.id)[0]),
                    users: this.state.users.map(
                        user => user.name===e.target.id
                            ?
                            ({...user, checked: 'true'})
                            :
                            user
                    )
                });
        }
        else{
            if(e.target.id==='isAllCheck')
                this.setState({
                    isAllCheck : false,
                    users: this.state.users.map(
                        user =>
                            ({...user, checked: 'false'})
                    ),
                    checkedList: []
                });
            else
                this.setState({
                    checkedList: this.state.checkedList.filter(user => user.email!==e.target.id),
                    users: this.state.users.map(
                        user => user.email===e.target.id
                            ?
                            ({...user, checked: 'false'})
                            :
                            user
                    )
                });
        }
    };

    render() {
        const { classes } = this.props;
        const { users } = this.state;
        const u = users.map(user => (
            [user.email, user.name, user.phoneNumber, user.checked]
        ));
        return (
            <React.Fragment>
                <UserModal
                    isOpen={this.state.isOpen}
                    onClose={this.toggleModal}
                    item={this.state.selectedItem}
                />
                <CustomTabs
                    headerColor="primary"
                    tabs={[
                        {
                            tabName: '유저들',
                            tabContent: (
                                <React.Fragment>
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["이메일", "이름", "전화번호"]}
                                        tableData={
                                            u
                                        }
                                        type="modal"
                                        isAdmin={true}
                                        handleClickOpen={this.handleClickOpen}
                                        handleChangeCheckbox={this.handleChangeCheckbox}
                                        isAllCheck={this.state.isAllCheck}
                                    />
                                    <Button color="rose" onClick={this.toggleStateModal} simple size="lg">
                                        유저 삭제
                                    </Button>
                                    <Button color="primary" onClick={this.toggleStateModal} simple size="lg">
                                        관리자로 변경
                                    </Button>
                                    <Button color="info" onClick={this.toggleStateModal} simple size="lg">
                                        관리자 권한 해제
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

export default withStyles(styles)(AdminUsers);
