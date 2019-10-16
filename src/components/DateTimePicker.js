import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "../react-kit/components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import "../react-kit/assets/scss/material-kit-react.scss"

import Datetime from "react-datetime";

const styles = {
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

class DateTimePicker extends React.Component {
    state = {
        open: false,
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
        phoneNumber: "",
        datetime: ""
    };

    handleChange = (value) => {
        console.log(value._d);
        this.setState({
            datetime: value._d
        });
    };

    handleClickOpen = () => {
        this.test();
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    yesterday = Datetime.moment().subtract(1, 'day');
    isValid = (current) => {
        return current.isAfter(this.yesterday);
    };

    test = () => {
        console.log(Datetime.moment());

    };

    reservation = () => {
        const {postReservation} = this.props;
        if(this.state.datetime!==''){
            postReservation(this.state.datetime);
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Button color="primary" onClick={this.handleClickOpen}>
                    예약하기
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">예약하기</DialogTitle>
                    <DialogContent
                        style={{height: "400px", alignItems: "center"}}>
                        <DialogContentText>
                            방문 수령만 가능합니다. 방문할 날짜와 시간을 입력해 주세요.
                        </DialogContentText>
                        <div>
                            <InputLabel className={classes.label}>
                                Datetime Picker
                            </InputLabel>
                            <br />
                                <Datetime
                                    inputProps={{ placeholder: "클릭하세요"}}
                                    isValidDate={this.isValid}
                                    onChange={this.handleChange}
                                />
                            <br />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="rose" simple size="lg">
                            취소
                        </Button>
                        <Button color="primary" onClick={this.reservation} simple size="lg">
                            예약 완료
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(DateTimePicker);
