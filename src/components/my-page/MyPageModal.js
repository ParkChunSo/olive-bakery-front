import React from 'react';
import CustomInput from "../../react-kit/components/CustomInput/CustomInput.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "../../react-kit/components/CustomButtons/Button.jsx";
import axios from "axios";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/LockOutlined";
import Phone from "@material-ui/icons/Phone";
import storage from "../../storage";
import withStyles from "@material-ui/core/styles/withStyles";
import checkStyles from "../../react-kit/assets/jss/material-kit-react/customCheckboxRadioSwitch";

import * as api from "../../common/Api"

let styles = {...checkStyles};

class MyPageModal extends React.Component {
    state = {
        password: "",
        confirmPassword: "",
        name: "",
        phoneNumber: "",
        male: true,
        age: 0
    };

    componentDidMount(){
        this.getUserData();
    }

    getUserData = async () => {
        let userData = await api.getUserData();
        if(userData === undefined || userData === null || userData === ""){
            userData = {};
        }

        this.setState({
            id: userData.id,
            name: userData.name,
            phoneNumber: userData.phoneNumber,
            male: userData.male,
            age: userData.age
        })
    };

    putProfile = () => {
        axios.put('http://15.164.57.47:8080/olive/sign', {
            headers: { 'Content-type': 'application/json', },
            "email": this.email,
            "name": this.state.name,
            "phoneNumber": this.state.phoneNumber,
            "pw": this.state.password,
        }).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200){
                this.props.addAlert('프로필 수정완료');
                this.resetProfile();//이부분 바꿔야함
                this.props.onClose();
            }
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };


    render() {
        if(this.props.isOpen===false)
            return null;
        const {userData} = this.props;
        console.log(userData);

        return (
            <React.Fragment>
                <Dialog
                    open={this.props.isOpen}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">프로필 수정</DialogTitle>
                    <DialogContent>
                        <CustomInput
                            labelText="Name"
                            id="name"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: this.state.name,
                                type: "text",
                                onChange: this.handleChange,
                                required: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <People/>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <CustomInput
                            labelText="Phone Number"
                            id="phoneNumber"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                value: this.state.phoneNumber,
                                onChange: this.handleChange,
                                required: true,
                                placeholder: "01012341234",
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Phone /*className={classes.inputIconsColor}*/ />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <CustomInput
                            labelText="Password"
                            id="password"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "password",
                                value: this.state.password,
                                onChange: this.handleChange,
                                required: true,
                                placeholder: "****",
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Lock /*className={classes.inputIconsColor}*//>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {/*error={!(/^[a-z][a-z0-9]{4,14}$/i.test(this.state.password))}*/}
                        <CustomInput
                            labelText="Confirm Password"
                            id="confirmPassword"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "password",
                                value: this.state.confirmPassword,
                                onChange: this.handleChange,
                                required: true,
                                placeholder: "****",
                                error: this.state.password!==this.state.confirmPassword,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Lock /*className={classes.inputIconsColor}*//>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="rose" onClick={this.props.onClose} simple size="lg">
                            닫기
                        </Button>
                        <Button onClick={this.resetProfile} color="info" simple size="lg">
                            초기화
                        </Button>
                        <Button color="primary" onClick={this.putProfile} simple size="lg">
                            프로필 수정
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default  withStyles(styles)(MyPageModal);
