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
import Table from "../react-dashboard/components/Table/Table.jsx";
import storage from "../storage";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import checkStyles from "../react-kit/assets/jss/material-kit-react/customCheckboxRadioSwitch";



let styles = {...checkStyles};
const token = storage.get('token');

class CreateBoardModal extends React.Component {
    state = {
        Title: "",
        context: "",
        isNotice: false,
        isSecret: false
    };
    componentDidMount() {
        this.email = storage.get('email');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    postBoard = () => {
        axios.post('http://15.164.57.47:8080/olive/board', {
            "boardType": "BOARD",
            "boardId": 0,
            "context": this.state.context,
            "isNotice": this.state.isNotice,
            "isSecret": this.state.isSecret,
            "title": this.state.Title,
        },
            {headers: { 'Content-type': 'application/json', 'Authorization': token}}).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                this.props.addAlert('게시물 추가완료');
                this.props.resetTable('board', 1);
                this.resetBoard();
                this.props.onClose();
            }
        });
    };

    postQna = () => {
        axios.post('http://15.164.57.47:8080/olive/board', {
            "boardType": "QUESTION",
            "boardId": 0,
            "context": this.state.context,
            "notice": this.state.isNotice,
            "secret": this.state.isSecret,
            "title": this.state.Title
        },
            {headers: { 'Content-type': 'application/json', 'Authorization': token}}).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                this.props.addAlert('QnA 추가완료');
                this.props.resetTable('qna', 1);
                this.resetBoard();
                this.props.onClose();
            }
        });
    };

    handleChangeCheckbox = (e) => {
        if(e.target.checked){
            this.setState({
                [e.target.id]: true
            });
        }
        else{
            this.setState({
                [e.target.id]: false
            });
        }
    };

    resetBoard = () => {
        this.setState({
            Title: "",
            context: "",
            isNotice: false,
            isSecret: false
        });
    };

    render() {
        const {isAdmin, classes, type} = this.props;
        const wrapperDiv = classNames(
            classes.checkboxAndRadio,
            classes.checkboxAndRadioHorizontal
        );
        if(this.props.isOpen===false)
            return null;
        return (
            <React.Fragment>
                <Dialog
                    open={this.props.isOpen}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">게시물/QnA 추가</DialogTitle>
                    <DialogContent>
                        <CustomInput
                            labelText="게시할 내용"
                            id="context"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                value: this.state.context,
                                onChange: this.handleChange,
                                multiline: true,
                                required: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <People /*className={classes.inputIconsColor}*//>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {
                            isAdmin === false
                                ?
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="isSecret"
                                            onChange={this.handleChangeCheckbox}
                                            checked={this.state.isSecret===true}
                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                            icon={<Check className={classes.uncheckedIcon} />}
                                            classes={{ checked: classes.checked }}
                                        />
                                    }
                                    classes={{ label: classes.label }}
                                    label="isSecret"
                                />
                                :
                                <React.Fragment>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="isNotice"
                                                onChange={this.handleChangeCheckbox}
                                                checked={this.state.isNotice===true}
                                                checkedIcon={<Check className={classes.checkedIcon} />}
                                                icon={<Check className={classes.uncheckedIcon} />}
                                                classes={{ checked: classes.checked }}
                                            />
                                        }
                                        classes={{ label: classes.label }}
                                        label="isNotice"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="isSecret"
                                                checked={this.state.isSecret===true}
                                                onChange={this.handleChangeCheckbox}
                                                checkedIcon={<Check className={classes.checkedIcon} />}
                                                icon={<Check className={classes.uncheckedIcon} />}
                                                classes={{ checked: classes.checked }}
                                            />
                                        }
                                        classes={{ label: classes.label }}
                                        label="isSecret"
                                    />
                                </React.Fragment>
                        }

                        {/*error={!(/^[a-z][a-z0-9]{4,14}$/i.test(this.state.password))}*/}
                        <CustomInput
                            labelText="Title"
                            id="Title"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "string",
                                value: this.state.Title,
                                onChange: this.handleChange,
                                required: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Lock /*className={classes.inputIconsColor}*//>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </DialogContent>
                    {
                        isAdmin===true
                        ?
                            <DialogActions>
                                <Button onClick={this.props.onClose} color="rose" simple size="lg">
                                    취소
                                </Button>
                                <Button onClick={this.resetBoard} color="info" simple size="lg">
                                    초기화
                                </Button>
                                <Button color="primary" onClick={this.postBoard} simple size="lg">
                                    게시물 추가
                                </Button>
                                <Button color="primary" onClick={this.postQna} simple size="lg">
                                    Q&A 추가
                                </Button>
                            </DialogActions>
                        :
                            (
                                type==='board'
                                ?
                                    <DialogActions>
                                        <Button onClick={this.props.onClose} color="rose" simple size="lg">
                                            취소
                                        </Button>
                                        <Button onClick={this.resetBoard} color="info" simple size="lg">
                                            초기화
                                        </Button>
                                        <Button color="primary" onClick={this.postBoard} simple size="lg">
                                            게시물 추가
                                        </Button>
                                    </DialogActions>
                                :
                                    <DialogActions>
                                        <Button onClick={this.props.onClose} color="rose" simple size="lg">
                                            취소
                                        </Button>
                                        <Button onClick={this.resetBoard} color="info" simple size="lg">
                                            초기화
                                        </Button>
                                        <Button color="primary" onClick={this.postQna} simple size="lg">
                                            Q&A 추가
                                        </Button>
                                    </DialogActions>
                            )
                    }
                </Dialog>
            </React.Fragment>
        );
    }
}

export default  withStyles(styles)(CreateBoardModal);
