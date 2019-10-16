import React from 'react';
import CustomInput from "../../react-kit/components/CustomInput/CustomInput.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "../../react-kit/components/CustomButtons/Button.jsx";
import axios from "axios";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/LockOutlined";
import Phone from "@material-ui/icons/Phone";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import checkStyles from "../../react-kit/assets/jss/material-kit-react/customCheckboxRadioSwitch";
import Switch from "@material-ui/core/Switch";
import Radio from "@material-ui/core/Radio";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import * as api from "../../common/Api"

let styles = {...checkStyles};

class BreadStateModal extends React.Component {
    state = {
        breadState: "BEST",
        isSoldOut: false,
        item: []
    };

    breadState = ['BEST', 'NEW', 'RECOMMEND', 'SPECIAL', 'NORMAL'];

    componentDidUpdate(preProps, preState){
        // this.setState({
        //     item: this.props
        // });
    }

    putBreadState = async (items) => {
        let soldOutStatusCode, stateStatusCode;

        console.log(items);
        for(var index in items){
            console.log(items[index]);
            soldOutStatusCode = await api.updateStateOfSoldOut(items[index].id, this.state.isSoldOut);
            stateStatusCode = await api.updateStatus(items[index].id, this.state.breadState);
            if(soldOutStatusCode !== 200 || stateStatusCode !== 200){
                this.props.addAlert("빵 정보를 수정하는데 오류가 발생하였습니다.");
                this.props.onClose();
            }
        }
        
        this.props.resetTable();
        this.props.onClose();
    };

    handleChangeIsSoldOut = (e) => {
        this.setState({
            isSoldOut: e.target.checked
        });
    };

    handleChangeBreadState = (e) => {
            this.setState({
                breadState: this.breadState.filter(state => state===e.target.id)[0]
            });
    };

    render() {
        const {classes} = this.props;
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
                    <DialogTitle id="form-dialog-title">빵 상태를 변경합니다.</DialogTitle>
                    <DialogContent>
                        <div>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.isSoldOut}
                                        onChange={this.handleChangeIsSoldOut}
                                        classes={{
                                            switchBase: classes.switchBase,
                                            checked: classes.switchChecked,
                                            icon: classes.switchIcon,
                                            iconChecked: classes.switchIconChecked,
                                            bar: classes.switchBar
                                        }}
                                    />
                                }
                                classes={{ label: classes.label }}
                                label="매진"
                            />
                        </div>
                        {
                            this.breadState.map((state, index) => (
                                <React.Fragment key={index}>
                                    <div className={wrapperDiv}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    onChange={this.handleChangeBreadState}
                                                    checked={this.state.breadState === state}
                                                    value={state}
                                                    id={state}
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord className={classes.radioChecked} />
                                                    }
                                                    classes={{
                                                        checked: classes.radio
                                                    }}
                                                />
                                            }
                                            classes={{ label: classes.label }}
                                            label={state}
                                        />
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="rose" simple size="lg">
                            취소
                        </Button>
                        < Button color="primary" onClick={() => this.putBreadState(this.props.item)} simple size="lg">
                            빵 상태 수정
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(BreadStateModal);
