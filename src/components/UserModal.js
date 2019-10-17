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

class UserModal extends React.Component {
    state = {
        confirmPassword: "",
    };
    componentDidMount() {
        /*axios.get('http://15.164.57.47:8080/olive/bread/name', {
            headers: { 'Content-type': 'application/json', },
        }).then(response => {
            //this.props.onReceive(response.data.number);
            console.log(response);
            if(response.status===200)
                console.log('알림창 추가하자');
        });*/
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleAddItem = () => {
        this.props.addItem(this.props.item);
        this.props.onClose();
    };

    postSignUp = () => {
        axios.post('http://15.164.57.47:8080/olive/sign/signup', {
            headers: { 'Content-type': 'application/json', },
            "email": this.state.email,
            "name": this.state.name,
            "phoneNumber": this.state.phoneNumber,
            "pw": "",
        }).then(response => {
            //this.props.onReceive(response.data.number);
            console.log(response);
            if(response.status===200)
                console.log('알림창 추가하자');
        });
    };

    render() {
        const {item} = this.props;
        if(this.props.isOpen===false)
            return null;
        return (
            <React.Fragment>
                <Dialog
                    open={this.props.isOpen}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{item.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {item.context}
                        </DialogContentText>

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
                        <Button onClick={this.props.onClose} color="rose" simple size="lg">
                            닫기
                        </Button>
                        <Button color="primary" onClick={this.handleAddItem} simple size="lg">
                            장바구니 담기
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default UserModal;
