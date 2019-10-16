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

export default class SignUpForm extends React.Component {
    state = {
        open: false,
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
        phoneNumber: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    postSignUp = () => {
        axios.post('http://15.164.57.47:8080/olive/sign/signup', {
            headers: { 'Content-type': 'application/json', },
            "email": this.state.email,
            "name": this.state.name,
            "phoneNumber": this.state.phoneNumber,
            "pw": this.state.password
        }).then(response => {
            //this.props.onReceive(response.data.number);
            console.log(response);
            if(response.status===200){
                this.props.addAlert('회원가입이 완료되었습니다');
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <Button simple color="success" size="lg" onClick={this.handleClickOpen}>
                    회원가입
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">회원가입</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            올리브영 베이커리의 회원이 되시면.......뭐라하지 흠
                        </DialogContentText>
                        <CustomInput
                            labelText="E-mail"
                            id="email"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "email",
                                onChange: this.handleChange,
                                required: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Email /*className={classes.inputIconsColor}*//>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <CustomInput
                            labelText="Name"
                            id="name"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                onChange: this.handleChange,
                                required: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <People /*className={classes.inputIconsColor}*//>
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
                                onChange: this.handleChange,
                                required: true,
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
                                onChange: this.handleChange,
                                required: true,
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
                        <Button onClick={this.handleClose} color="rose" simple size="lg">
                            취소
                        </Button>
                        <Button color="primary" onClick={this.postSignUp} simple size="lg">
                            회원가입
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}
