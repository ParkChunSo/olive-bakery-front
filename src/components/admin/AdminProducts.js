import React from 'react';
import Button from "../../react-kit/components/CustomButtons/Button.jsx";
import axios, { post } from "axios";
import classNames from "classnames";
import checkStyles from "../../react-kit/assets/jss/material-kit-react/customCheckboxRadioSwitch";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomTabs from "../../react-kit/components/CustomTabs/CustomTabs.jsx";
import Table from "../../react-dashboard/components/Table/Table.jsx";
import BreadModal from "../BreadModal";
import AdminProductsModal from "../admin/AdminProductsModal";
import BreadStateModal from "../admin/BreadStateModal";
import storage from "../../storage";

import * as api from "../../common/Api";

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

class AdminProducts extends React.Component {
    state = {
        isCreating: false,
        ingredients: [],
        bread: [],
        isOpenForm: false,
        isOpenTable: false,
        isOpenState: false,
        selectedItem: null,
        checkedList: [],
        isAllCheck: false
    };

    componentDidMount() {
        //this.resetInput();
        this.getBread();
        this.getIngredients();
    }

    getBread = async() => {
        const response = await api.getAllBreads();
        if(response === null){

        }else{
            this.setState({
                bread: response.map(data=>({...data, checked:'false'}))
            });
        }
    };

    getIngredients = () => {
        axios.get('http://15.164.57.47:8080/olive/bread/ingredients'
        ).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200) {
                this.setState({
                    ingredients: response.data
                });
            }
        });
    };

    deleteBread = async () =>{
        const {checkedList} = this.state;
        console.log(checkedList);
        
        for(const index in checkedList){
            const status = await api.deleteBread(checkedList[index].id, true);
            if(status !== 200){
                this.props.addAlert("빵 삭제하는데 오류가 발생하였습니다.")
            }
        }
        this.getBread();
    }

    toggleFormModal = () => {
        this.setState({
            isOpenForm: !this.state.isOpenForm
        });
    };

    toggleTableModal = () => {
        this.setState({
            isOpenTable: !this.state.isOpenTable
        });
    };

    toggleStateModal = () => {
        this.setState({
            isOpenState: !this.state.isOpenState
        });
        console.log(this.state.checkedList);
    };

    handleClickOpen = (id, type) => {
        axios.get(`http://15.164.57.47:8080/olive/bread/name/${id}`, {
            headers: { 'Content-type': 'application/json', },
        }).then(response => {
            //this.props.onReceive(response.data.number);
            this.setState({
                selectedItem: response.data
            });
            if(type==='parent')
                this.toggleTableModal();
        });
    };

    handleChangeCheckbox = (e) => {
        console.log(this.state.checkedList);
        console.log(this.state.bread)
        if(e.target.checked){
            if(e.target.id==='isAllCheck')
                this.setState({
                    isAllCheck : true,
                    bread: this.state.bread.map(
                        bread =>
                            ({...bread, checked: 'true'})
                    ),
                    checkedList: this.state.bread.map(bread=> bread)
                });
            else
                this.setState({
                    checkedList: this.state.checkedList.concat(this.state.bread.filter(bread => bread.name===e.target.id)[0]),
                    bread: this.state.bread.map(
                        bread => bread.name===e.target.id
                        ?
                        ({...bread, checked: 'true'})
                        :
                        bread
                    )
                });
        }
        else{
            if(e.target.id==='isAllCheck')
                this.setState({
                    isAllCheck : false,
                    bread: this.state.bread.map(
                        bread =>
                            ({...bread, checked: 'false'})
                    ),
                    checkedList: []
                });
            else
                this.setState({
                    checkedList: this.state.checkedList.filter(bread => bread.name!==e.target.id),
                    bread: this.state.bread.map(
                        bread => bread.name===e.target.id
                            ?
                            ({...bread, checked: 'false'})
                            :
                            bread
                    )
                });
        }
    };

    render() {
        const { classes } = this.props;
        const { bread} = this.state;
        const wrapperDiv = classNames(
            classes.checkboxAndRadio,
            classes.checkboxAndRadioHorizontal
        );
        console.log(bread);
        let b = bread.map(bread => (
            [bread.name, bread.price.toString(), bread.description, (bread.isSoldOut ? '매진':'진열'), (bread.state===null ? 'null':bread.state), bread.checked]
        ));
        return (
            <React.Fragment>
                <BreadModal
                    isOpen={this.state.isOpenTable}
                    onClose={this.toggleTableModal}
                    item={this.state.selectedItem}
                    resetBread={this.handleClickOpen}
                    resetTable={this.getBread}
                    ingredients={this.state.ingredients}
                    getIngredients={this.getIngredients}
                    isAdmin={true}
                    addAlert={this.props.addAlert}
                />
                <BreadStateModal
                    isOpen={this.state.isOpenState}
                    onClose={this.toggleStateModal}
                    item={this.state.checkedList}
                    resetTable={this.getBread}
                    addAlert={this.props.addAlert}
                />
                <AdminProductsModal
                    isOpen={this.state.isOpenForm}
                    onClose={this.toggleFormModal}
                    resetTable={this.getBread}
                    getIngredients={this.getIngredients}
                    addAlert={this.props.addAlert}
                />
                <CustomTabs
                    headerColor="primary"
                    tabs={[
                        {
                            tabName: '빵',
                            tabContent: (
                                <React.Fragment>
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["빵이름", "가격", "설명", "진열/매진", "상태"]}
                                        tableData={
                                            b
                                        }
                                        type="modal"
                                        isAdmin={true}
                                        handleClickOpen={this.handleClickOpen}
                                        handleChangeCheckbox={this.handleChangeCheckbox}
                                        isAllCheck={this.state.isAllCheck}
                                    />
                                    <Button color="info" onClick={this.toggleStateModal} simple size="lg">
                                        상태변경
                                    </Button>
                                    <Button color="primary" onClick={this.toggleFormModal} simple size="lg">
                                        빵 추가
                                    </Button>
                                    <Button color="primary" onClick={this.deleteBread} simple size="lg">
                                        빵 삭제
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

export default withStyles(styles)(AdminProducts);
