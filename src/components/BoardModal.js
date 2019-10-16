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


let email = null;
let styles = {...checkStyles};

class BoardModal extends React.Component {
    state = {
        isUpdate: false,
        Title: "",
        context: "",
        isNotice: "false",
        isSecret: "false",
        content: ""
    };
    componentDidMount() {
        this.email = storage.get('email');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    deleteBoard = () => {
        if(this.email===this.props.item.posts.userId || this.props.isAdmin===true) {
            axios.delete(`http://15.164.57.47:8080/olive/board/id/${this.props.item.posts.boardId}`
            ).then(response => {
                if (response.status === 200) {
                    this.props.addAlert(`게시물 ${this.props.item.posts.boardId.toString()} 삭제완료`);
                    this.props.onClose();
                    if(this.props.type==='board')
                        this.props.resetTable('board', this.props.boardPage);
                    else
                        this.props.resetTable('qna', this.props.qnaPage);
                }
            });
        }
    };

    putBoard = () => {
        if(this.email===this.props.item.posts.userId || this.props.isAdmin===true) {
            axios.put('http://15.164.57.47:8080/olive/board', {
                headers: {'Content-type': 'application/json',},
                "boardId": this.props.item.posts.boardId,
                "context": this.state.context,
                "isNotice": this.state.isNotice,
                "isSecret": this.state.isSecret,
                "title": this.state.Title
            }).then(response => {
                //this.props.onReceive(response.data.number);
                if (response.status === 200) {
                    this.props.addAlert(`게시물 ${this.props.item.posts.boardId.toString()} 수정완료`);
                    this.props.resetTable('board', this.props.boardPage);
                    this.props.resetComment(this.props.item.posts.boardId, 'child');
                    this.toggleUpdateBoard();
                }
            });
        }
    };

    postComment = () => {
        axios.post('http://15.164.57.47:8080/olive/board/comment', {
            headers: {'Content-type': 'application/json',},
            "boardId": this.props.item.posts.boardId.toString(),
            "content": this.state.content,
            "userId": this.email,
            "userName": "test",
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                this.props.resetComment(this.props.item.posts.boardId, 'child');
                this.setState({
                    content: ''
                });
            }
        });
    };

    handleChangeCheckbox = (e) => {
        if(e.target.checked){
            this.setState({
                [e.target.id]: "true"
            });
        }
        else{
            this.setState({
                [e.target.id]: "false"
            });
        }
    };

    toggleUpdateBoard = () => {
        this.setState({
            isUpdate: !this.state.isUpdate,
            Title: this.props.item.posts.title,
            context: this.props.item.posts.context,
            isNotice: this.props.item.posts.notice===true?'true':'false',
            isSecret: this.props.item.posts.secret===true?'true':'false'
        });
    };

    render() {
        const {item, isAdmin, classes} = this.props;
        const {isUpdate} = this.state;
        const wrapperDiv = classNames(
            classes.checkboxAndRadio,
            classes.checkboxAndRadioHorizontal
        );
        if(this.props.isOpen===false)
            return null;
        const c = item.comments.map(comment => (
            [comment.userName, comment.content, comment.insertTime, comment.updateTime]
        ));
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
                                <DialogTitle id="form-dialog-title">{item.posts.title}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        작성자: {item.posts.userId}<br/>
                                        작성 날짜: {item.posts.insertTime}<br/>
                                        수정 날짜: {item.posts.updateTime}<br/>
                                    </DialogContentText>
                                    {item.posts.context}
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["작성자", "내용", "등록날짜", "수정날짜"]}
                                        tableData={
                                            c
                                        }
                                        type="comments"
                                    />
                                    {
                                        this.props.type==='board'
                                        ?
                                        <React.Fragment>
                                            <CustomInput
                                                labelText="댓글 입력"
                                                id="content"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    value: this.state.content,
                                                    multiline: true,
                                                    onChange: this.handleChange,
                                                    required: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Lock /*className={classes.inputIconsColor}*//>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <Button onClick={this.postComment} color="info" simple size="lg">
                                                댓글 등록
                                            </Button>
                                        </React.Fragment>
                                        :
                                            (
                                                this.email===item.posts.userId || isAdmin===true
                                                ?
                                                    <React.Fragment>
                                                        <CustomInput
                                                            labelText="댓글 입력"
                                                            id="content"
                                                            formControlProps={{
                                                                fullWidth: true
                                                            }}
                                                            inputProps={{
                                                                type: "text",
                                                                value: this.state.content,
                                                                multiline: true,
                                                                onChange: this.handleChange,
                                                                required: true,
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <Lock /*className={classes.inputIconsColor}*//>
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                        <Button onClick={this.postComment} color="info" simple size="lg">
                                                            댓글 등록
                                                        </Button>
                                                    </React.Fragment>
                                                :
                                                    (null)
                                            )
                                    }
                                </DialogContent>
                                {
                                    this.email===item.posts.userId || isAdmin===true
                                    ?
                                        <DialogActions>
                                            <Button onClick={this.props.onClose} color="primary" simple size="lg">
                                                닫기
                                            </Button>
                                            <Button onClick={this.toggleUpdateBoard} color="info" simple size="lg">
                                                수정
                                            </Button>
                                            <Button color="rose" onClick={this.deleteBoard} simple size="lg">
                                                삭제
                                            </Button>
                                        </DialogActions>
                                    :
                                        <DialogActions>
                                            <Button onClick={this.props.onClose} color="primary" simple size="lg">
                                                닫기
                                            </Button>
                                        </DialogActions>
                                }
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <DialogTitle id="form-dialog-title">{item.posts.title}</DialogTitle>
                                <DialogContent>
                                    <CustomInput
                                        labelText="게시할 내용"
                                        id="context"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            defaultValue: item.posts.context,
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
                                            (null)
                                            :
                                            <React.Fragment>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            id="isNotice"
                                                            onChange={this.handleChangeCheckbox}
                                                            defaultChecked={this.state.isNotice==='true'}
                                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                                            icon={<Check className={classes.uncheckedIcon} />}
                                                            classes={{ checked: classes.checked }}
                                                            value='check'
                                                        />
                                                    }
                                                    classes={{ label: classes.label }}
                                                    label="isNotice"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            id="isSecret"
                                                            onChange={this.handleChangeCheckbox}
                                                            defaultChecked={this.state.isSecret==='true'}
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
                                            defaultValue: item.posts.title,
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
                                <DialogActions>
                                    <Button onClick={this.toggleUpdateBoard} color="rose" simple size="lg">
                                        취소
                                    </Button>
                                    <Button color="primary" onClick={this.putBoard} simple size="lg">
                                        게시물 수정 완료
                                    </Button>
                                </DialogActions>
                            </React.Fragment>
                    }
                </Dialog>
            </React.Fragment>
        );
    }
}

export default  withStyles(styles)(BoardModal);
