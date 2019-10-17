import React from 'react';
import CustomInput from "../react-kit/components/CustomInput/CustomInput.jsx";
import Button from "../react-kit/components/CustomButtons/Button.jsx";
import axios from "axios";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/LockOutlined";
import Phone from "@material-ui/icons/Phone";

import withStyles from "@material-ui/core/styles/withStyles";
import CustomTabs from "../react-kit/components/CustomTabs/CustomTabs.jsx";
import Table from "../react-dashboard/components/Table/Table.jsx";
import BoardModal from "./BoardModal";

import Pagination from "../react-kit/components/Pagination/Pagination";
import storage from "../storage";
import classNames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import checkStyles from "../react-kit/assets/jss/material-kit-react/customCheckboxRadioSwitch";
import {number} from "prop-types";
import CreateBoardModal from "./CreateBoardModal";
import * as api from "../common/Api"
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

let email = null;

class Board extends React.Component {
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

    handleClickBoard = () => {
        this.handleClickPage('board', this.state.boardPage);
    };

    handleClickQna = () => {
        this.handleClickPage('qna', this.state.qnaPage);
    };


    handleClickOpen = async (id, type) => {
        await api.getBoardById(id).then(response => {
                this.setState({
                    selectedItem: {
                        posts: {
                            boardId: response.data.boardId,
                            context: response.data.context,
                            insertTime: response.data.insertTime,
                            notice: response.data.isNotice,
                            secret: response.data.isSecret,
                            title: response.data.title,
                            updateTime: response.data.updateTime,
                            userId: response.data.userId
                        },
                        comments: response.data.comments === undefined ? [] : response.data.comments
                    }
                });    
        })
        
        if(type==='parent')
            this.toggleTableModal();
        
    };

    render() {
        const { classes } = this.props;
        const { board, qna, startPage, endPage, totalPage } = this.state;
        //let b = board.filter(board=> board.notice===false);
        let b = board.map(board => (
            [board.boardId.toString(), (board.notice===true?'공지':''), board.title, board.userId, board.insertTime.toString()]
        ));
        const q = qna.map(qna => (
            [qna.boardId.toString(), qna.title, qna.userId, qna.insertTime.toString()]
        ));
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
                    isAdmin={false}
                    type={this.state.boardType}
                    addAlert={this.props.addAlert}
                />
                <CreateBoardModal
                    isOpen={this.state.isOpenForm}
                    onClose={this.toggleFormModal}
                    resetTable={this.handleClickPage}
                    isAdmin={false}
                    type={this.state.boardType}
                    addAlert={this.props.addAlert}
                />
                <CustomTabs
                    headerColor="primary"
                    tabs={[
                        {
                            onClick: this.handleClickBoard,
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
                                        <Button color="primary" onClick={this.toggleFormModal} simple size="lg">
                                            게시물 추가
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )
                        },
                        {
                            onClick: this.handleClickQna,
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
                                        <Button color="primary" onClick={this.toggleFormModal} simple size="lg">
                                            질문하기
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

export default withStyles(styles)(Board);
