import React from 'react';
import CustomInput from "../../react-kit/components/CustomInput/CustomInput.jsx";
import Button from "../../react-kit/components/CustomButtons/Button.jsx";
import axios from "axios";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/LockOutlined";
import Phone from "@material-ui/icons/Phone";
import Card from "../../react-kit/components/Card/Card.jsx";
import CardBody from "../../react-kit/components/Card/CardBody.jsx";
import CardHeader from "../../react-kit/components/Card/CardHeader.jsx";
import CardFooter from "../../react-kit/components/Card/CardFooter.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Face from "@material-ui/icons/Face";
import CustomTabs from "../../react-kit/components/CustomTabs/CustomTabs.jsx";
import Table from "../../react-dashboard/components/Table/Table.jsx";
import BoardModal from "../BoardModal";

import Pagination from "../../react-kit/components/Pagination/Pagination";
import storage from "../../storage";
import classNames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import checkStyles from "../../react-kit/assets/jss/material-kit-react/customCheckboxRadioSwitch";
import {number} from "prop-types";
import CreateBoardModal from "../CreateBoardModal";

const token = storage.get('token');
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


class AdminBoard extends React.Component {
    state = {
        startPage: 0,
        endPage: 0,
        totalPage: 0,
        boardPage: 1,
        qnaPage: 1,
        board: [],
        qna: [],
        notice: [],
        isOpenTable: false,
        isOpenForm: false,
        selectedItem: {
            posts: {
                boardId: 0,
                context: '',
                insertTime: [],
                notice: null,
                secret: null,
                title: '',
                updateTime: [],
                userId: ''
            },
            comments: []
        },
        boardType: "board",
        checkedList: [],
        isAllCheck: false
    };

    componentDidMount() {
        this.email = storage.get('email');
        this.handleClickPage('board', 1);

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    getNotice = () => {
        axios.get('http://15.164.57.47:8080/olive/board/notice'
        ).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                this.setState({
                    notice: response.data.map(data=>({...data, checked:'false'})),
                });
            }
        });
    };

    deleteBoard = () => {
        const {checkedList, boardType} = this.state;
        let success = '공지사항 삭제완료: ';
        let fail = '실패: ';
        checkedList.map((board, index, array) => (
            axios.delete(`http://15.164.57.47:8080/olive/board/id/${board.boardId}`,{headers: { 'Content-type': 'application/json', 'Authorization': token}}
            ).then(response => {
                if(response.status===200)
                    success = success+' '+board.boardId.toString();
                else
                    fail = fail+' '+board.boardId.toString();
                if(index===array.length-1){
                    fail !== '실패: ' ? this.props.addAlert(success+'\n'+fail) : this.props.addAlert(success);
                    if(boardType==='board')
                        this.handleClickPage(boardType, this.state.boardPage);
                    else
                        this.handleClickPage(boardType, this.state.qnaPage);
                }
            })
        ));
    };

    putBoard = (isNotice) => {
        const {checkedList, boardType} = this.state;
        let success = '공지사항 변경완료: ';
        let fail = '실패: ';
        checkedList.map((board, index, array) => (
            axios.get(`http://15.164.57.47:8080/olive/board/id/${board.boardId}`,{
                    headers: { 'Content-type': 'application/json', 'Authorization': token}
                }
            ).then(response => {
                //this.props.onReceive(response.data.number);
                if(response.status===200) {
                    axios.put('http://15.164.57.47:8080/olive/board', {
                        "boardId": response.data.boardId,
                        "context": response.data.context,
                        "notice": isNotice,
                        "secret": false,
                        "title": response.data.title
                    },
                        {headers: { 'Content-type': 'application/json', 'Authorization': token}}).then(response => {
                        //this.props.onReceive(response.data.number);
                        if(response.status===200)
                            success = success+' '+board.boardId.toString();
                        else
                            fail = fail+' '+board.boardId.toString();
                        if(index===array.length-1){
                            fail !== '실패: ' ? this.props.addAlert(success+'\n'+fail) : this.props.addAlert(success);
                            if(boardType==='board')
                                this.handleClickPage(boardType, this.state.boardPage);
                            else
                                this.handleClickPage(boardType, this.state.qnaPage);
                        }
                    });
                }
            })
        ));
    };

    handleClickPage = (type,num) => {
        if(type==='board'){
            this.getNotice();
            axios.get(`http://15.164.57.47:8080/olive/board/BOARD/page/${num}`
            ).then(response => {
                //this.props.onReceive(response.data.number);
                if(response.status===200) {
                    let startPage = 0;
                    let endPage = 0;
                    if(parseInt(response.data.totalPages/11) === parseInt(num/11)) {
                        startPage = parseInt(num / 11)*10 + 1;
                        if(startPage==1)
                            endPage = startPage + response.data.totalPages % 11 -1;
                        else
                            endPage = startPage + response.data.totalPages % 11;
                    }
                    else{
                        startPage = parseInt(num /11)*10 +1;
                        endPage = startPage + 9;
                    }
                    this.setState({
                        board: [...this.state.notice, ...response.data.content.map(data=>({...data, checked:'false'}))],
                        boardPage: num,
                        startPage: startPage,
                        endPage: endPage,
                        totalPage: response.data.totalPages,
                        checkedList: [],
                        boardType: "board"
                    });
                }
            });
        }
        else{
            axios.get(`http://15.164.57.47:8080/olive/board/QUESTION/page/${num}`
            ).then(response => {
                //this.props.onReceive(response.data.number);
                if(response.status===200) {
                    let startPage = 0;
                    let endPage = 0;
                    if(parseInt(response.data.totalPages/11) === parseInt(num/11)) {
                        startPage = parseInt(num / 11)*10 + 1;
                        if(startPage==1)
                            endPage = startPage + response.data.totalPages % 11 -1;
                        else
                            endPage = startPage + response.data.totalPages % 11;
                    }
                    else{
                        startPage = parseInt(num /11)*10 +1;
                        endPage = startPage + 9;
                    }
                    this.setState({
                        qna: response.data.content.map(data=>({...data, checked:'false'})),
                        qnaPage: num,
                        startPage: startPage,
                        endPage: endPage,
                        totalPage: response.data.totalPages,
                        checkedList: [],
                        boardType: 'qna'
                    });
                }
            });
        }
    };

    handleChangeCheckbox = (e) => {
        console.log(this.state.checkedList);
        let {boardType} = this.state;
        if(boardType==="board"){
            if(e.target.checked){
                if(e.target.id==='isAllCheck') {
                    this.setState({
                        isAllCheck: true,
                        board: this.state.board.map(
                            board =>
                                ({...board, checked: 'true'})
                        ),
                        checkedList: this.state.board.map(board => board)
                    });
                }
                else {
                    this.setState({
                        checkedList: this.state.checkedList.concat(this.state.board.filter(board => board.boardId === parseInt(e.target.id))[0]),
                        board: this.state.board.map(
                            board => board.boardId === parseInt(e.target.id)
                                ?
                                ({...board, checked: 'true'})
                                :
                                board
                        )
                    });
                }
            }
            else{
                if(e.target.id==='isAllCheck')
                    this.setState({
                        isAllCheck : false,
                        board: this.state.board.map(
                            board =>
                                ({...board, checked: 'false'})
                        ),
                        checkedList: []
                    });
                else
                    this.setState({
                        checkedList: this.state.checkedList.filter(board => board.boardId!==parseInt(e.target.id)),
                        board: this.state.board.map(
                            board => board.boardId===parseInt(e.target.id)
                                ?
                                ({...board, checked: 'false'})
                                :
                                board
                        )
                    });
            }
        }
        else{
            if(e.target.checked){
                if(e.target.id==='isAllCheck') {
                    this.setState({
                        isAllCheck: true,
                        qna: this.state.qna.map(
                            qna =>
                                ({...qna, checked: 'true'})
                        ),
                        checkedList: this.state.qna.map(qna => qna)
                    });
                }
                else {
                    this.setState({
                        checkedList: this.state.checkedList.concat(this.state.qna.filter(qna => qna.boardId === parseInt(e.target.id))[0]),
                        qna: this.state.qna.map(
                            qna => qna.boardId === parseInt(e.target.id)
                                ?
                                ({...qna, checked: 'true'})
                                :
                                qna
                        )
                    });
                }
            }
            else{
                if(e.target.id==='isAllCheck')
                    this.setState({
                        isAllCheck : false,
                        qna: this.state.qna.map(
                            qna =>
                                ({...qna, checked: 'false'})
                        ),
                        checkedList: []
                    });
                else
                    this.setState({
                        checkedList: this.state.checkedList.filter(qna => qna.boardId!==parseInt(e.target.id)),
                        qna: this.state.qna.map(
                            qna => qna.boardId===parseInt(e.target.id)
                                ?
                                ({...qna, checked: 'false'})
                                :
                                qna
                        )
                    });
            }
        }
    };

    toggleTableModal = () => {
        this.setState({
            isOpenTable: !this.state.isOpenTable
        });
    };

    toggleFormModal = () => {
        this.setState({
            isOpenForm: !this.state.isOpenForm
        });
    };

    handleClickBoardTab = () => {
        this.handleClickPage('board', this.state.boardPage);
    };

    handleClickQnaTab = () => {
        this.handleClickPage('qna', this.state.qnaPage);
    };


    handleClickOpen = (id, type) => {
        axios.get(`http://15.164.57.47:8080/olive/board/id/${id}`
        ).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                this.setState({
                    selectedItem: {
                        posts: {
                            boardId: response.data.posts.boardId,
                            context: response.data.posts.context,
                            insertTime: response.data.posts.insertTime,
                            notice: response.data.posts.notice,
                            secret: response.data.posts.secret,
                            title: response.data.posts.title,
                            updateTime: response.data.posts.updateTime,
                            userId: response.data.posts.userId
                        },
                        comments: response.data.comments
                    }
                });
            }
        });
        if(type==='parent')
            this.toggleTableModal();
    };

    render() {
        const { classes } = this.props;
        const { board, qna, startPage, endPage, totalPage } = this.state;
        //let b = board.filter(board=> board.notice===false);
        let b = board.map(board => (
            [board.boardId.toString(), (board.notice===true?'공지':''), board.title, board.userId, board.insertTime.toString(), board.checked]
        ));
        const q = qna.map(qna => (
            [qna.boardId.toString(), qna.title, qna.userId, qna.insertTime.toString(), qna.checked]
        ));
        const wrapperDiv = classNames(
            classes.checkboxAndRadio,
            classes.checkboxAndRadioHorizontal
        );
        let page = startPage;
        let pages = [];
        let pageNum = (this.state.boardType==='board'?this.state.boardPage:this.state.qnaPage);
        if(startPage!==1)
            pages = [...pages, {text: 'PREV', onClick: this.handleClickPage, type: startPage-1}];
        while(page<=endPage){
            pages = [...pages, {text: page, onClick: this.handleClickPage, type: 'num'}];
            page = page+1;
        }
        if(endPage!==totalPage)
            pages = [...pages, {text: 'NEXT', onClick: this.handleClickPage, type: endPage+1}];
        return (
            <React.Fragment>
                <BoardModal
                    isOpen={this.state.isOpenTable}
                    onClose={this.toggleTableModal}
                    item={this.state.selectedItem}
                    resetComment={this.handleClickOpen}
                    resetTable={this.handleClickPage}
                    boardPage={this.state.boardPage}
                    qnaPage={this.state.qnaPage}
                    isAdmin={true}
                    type={this.state.boardType}
                    addAlert={this.props.addAlert}
                />
                <CreateBoardModal
                    isOpen={this.state.isOpenForm}
                    onClose={this.toggleFormModal}
                    resetTable={this.handleClickPage}
                    isAdmin={true}
                    addAlert={this.props.addAlert}
                />
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>게시물 추가</h4>
                        <p className={classes.cardCategoryWhite}>
                            게시물 추가하시겠어요?
                        </p>
                    </CardHeader>
                    <CardBody>

                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <Button color="primary" onClick={this.toggleFormModal} simple size="lg">
                            게시물 추가
                        </Button>
                    </CardFooter>
                </Card>
                <CustomTabs
                    headerColor="primary"
                    tabs={[
                        {
                            onClick: this.handleClickBoardTab,
                            tabName: '게시판',
                            tabContent: (
                                <React.Fragment>
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["번호", "공지", "제목", "작성자", "날짜시간"]}
                                        tableData={
                                            b
                                        }
                                        type="modal"
                                        isAdmin={true}
                                        handleClickOpen={this.handleClickOpen}
                                        handleChangeCheckbox={this.handleChangeCheckbox}
                                        isAllCheck={this.state.isAllCheck}
                                    />
                                    <Pagination
                                        pages={pages}
                                        color="primary"
                                        type="board"
                                    />
                                    <div>
                                        {pageNum}페이지
                                    </div>
                                    <div>
                                        <Button color="rose" onClick={this.deleteBoard} simple size="lg">
                                            게시물 삭제
                                        </Button>
                                        <Button color="primary" onClick={()=>this.putBoard(true)} simple size="lg">
                                            공지사항 등록
                                        </Button>
                                        <Button color="info" onClick={()=>this.putBoard(false)} simple size="lg">
                                            공지사항 해제
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )
                        },
                        {
                            onClick: this.handleClickQnaTab,
                            tabName: 'Q&A',
                            tabContent: (
                                <React.Fragment>
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["번호", "제목", "작성자", "날짜시간"]}
                                        tableData={
                                            q
                                        }
                                        type="modal"
                                        isAdmin={true}
                                        handleClickOpen={this.handleClickOpen}
                                        handleChangeCheckbox={this.handleChangeCheckbox}
                                        isAllCheck={this.state.isAllCheck}
                                    />
                                    <Pagination
                                        pages={pages}
                                        color="info"
                                        type="qna"
                                    />
                                    <div>
                                        {pageNum}페이지
                                    </div>
                                    <div>
                                        <Button color="rose" onClick={this.deleteBoard} simple size="lg">
                                            게시물 삭제
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    ]}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AdminBoard);
