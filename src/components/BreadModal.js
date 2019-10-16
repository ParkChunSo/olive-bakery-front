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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import checkStyles from "../react-kit/assets/jss/material-kit-react/customCheckboxRadioSwitch";
import {DropzoneArea} from "material-ui-dropzone";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import * as api from "../common/Api";

let styles = {...checkStyles};

class BreadModal extends React.Component {
    state = {
        isUpdate: false,
        description: "",
        detailDescription: "",
        ingredientsList: [],
        name: "",
        price: 0,
        isCreating: false,
        ingredients: [],
        ingredientName: "",
        origin: "",
        files: [],
        days: [],
        status: ""
    };
    dayTypes = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    componentDidMount() {
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    toggleUpdateBread = () => {
        this.setState({
            description: this.props.item.description,
            detailDescription: this.props.item.detailDescription,
            ingredientsList: this.props.item.ingredientsList,
            name: this.props.item.name,
            price: this.props.item.price,
            ingredients: this.props.ingredients,
            isUpdate: !this.state.isUpdate
        });
    };

    toggleCreating = () => {
        this.setState({
            isCreating: !this.state.isCreating
        });
    };

    putBread = async () => {
        const breadData = {
            "name": this.props.item.name,
            "price": this.state.price,
            "description": this.state.description,
            "detailDescription": this.state.detailDescription,
            "ingredientsList": this.state.ingredientsList,
            "days": this.state.days,
            "state": this.props.state
        }
        console.log(breadData);
        console.log(this.state.files);
        
        let statusCode;
        if(this.state.files === [] || this.state.files === undefined || this.state.files === null){
            statusCode = await api.updateBread(breadData);
        }else{
            statusCode = await api.updateBread(breadData, this.state.files[0]);
        }
        

        if (statusCode === 200) {
            this.props.addAlert(`${this.props.item.name} 수정완료`);
            this.props.resetTable();
            this.props.resetBread(this.props.item.name, 'child');
            this.toggleUpdateBread();
        }
        else {
            this.props.addAlert(`${this.props.item.name} 를 수정하는데 오류가 발생하였습니다.`);
        }
    };

    handleChangeFile = files => {
        this.setState({
            files: files
        });
    };

    handleChangeIngredients = (e) => {
        if(e.target.checked){
            this.setState({
                ingredientsList: this.state.ingredientsList.concat(this.state.ingredients.filter(ingredient => (ingredient.name+ingredient.origin)===e.target.id)[0])
            });
        }
        else{
            this.setState({
                ingredientsList: this.state.ingredientsList.filter(ingredient => (ingredient.name+ingredient.origin)!==e.target.id)
            });
        }
    };

    handleChangeDayTypes = (e) => {
        if(e.target.checked){
            this.setState({
                days: this.state.days.concat(this.dayTypes.filter(day => day===e.target.id)[0])
            });
        }
        else{
            this.setState({
                days: this.state.days.filter(day => day!==e.target.id)
            });
        }
    };

    handleAddItem = (e) => {
        this.props.addItem(e);
        this.props.onClose();
    };

    handleAddIngredient = () => {
        this.setState({
           ingredients: this.state.ingredients.concat({
               name: this.state.ingredientName,
               origin: this.state.origin
           })
        });
        this.toggleCreating();
    };

    handleIngredientIsChecked = (name, origin) => {
        if(this.state.ingredientsList[0]===undefined)
            return false;
        if(this.state.ingredientsList.filter(ingredient=> ingredient.name===name && ingredient.origin===origin)[0]!==undefined)
            return true;
        else
            return false;
    };

    render() {
        const {item, isAdmin, classes} = this.props;
        const {isCreating, isUpdate} = this.state;
        const wrapperDiv = classNames(
            classes.checkboxAndRadio,
            classes.checkboxAndRadioHorizontal
        );
        if(this.props.isOpen===false){
            return null;
        }
        let ingredients = this.state.ingredients;
        ingredients = ingredients.map(ingredient => (
            {name: ingredient.name, origin: ingredient.origin, checked: this.handleIngredientIsChecked(ingredient.name, ingredient.origin)}
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
                            <DialogTitle id="form-dialog-title">{item.name}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {item.name}
                                </DialogContentText>
                                <p>
                                    {item.breadState}
                                </p>
                                <p>
                                    {item.detailDescription}
                                </p>
                                <ul>재료/원산지
                                {
                                    item.ingredientsList.map(ingredient=>(
                                    <li key={ingredient.name}>
                                    {ingredient.name}/{ingredient.origin}
                                    </li>
                                    ))
                                }
                                </ul>
                                {
                                    item.isSoldOut===false
                                    ?
                                    null
                                    :
                                    <p>매진</p>
                                }
                                <p>
                                가격 :{item.price}원
                                </p>
                            </DialogContent>
                            {
                                isAdmin === false
                                ?
                                <DialogActions>
                                    <Button onClick={this.props.onClose} color="rose" simple size="lg">
                                        닫기
                                    </Button>
                                    < Button value={item.name} color="primary" onClick={this.handleAddItem} simple size="lg">
                                        장바구니 담기
                                    </Button>
                                </DialogActions>
                                :
                                <DialogActions>
                                    <Button onClick={this.props.onClose} color="rose" simple size="lg">
                                        닫기
                                    </Button>
                                    < Button color="primary" onClick={this.toggleUpdateBread} simple size="lg">
                                        빵 정보 수정
                                    </Button>
                                </DialogActions>
                            }
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <DialogTitle id="form-dialog-title">{item.name}</DialogTitle>
                            <DialogContent>
                                <CustomInput
                                    labelText="빵 이름"
                                    id="name"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        defaultValue: item.name,
                                        onChange: this.handleChange,
                                        required: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Lock /*className={classes.inputIconsColor}*//>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <CustomInput
                                    labelText="가격"
                                    id="price"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "number",
                                        defaultValue: item.price,
                                        onChange: this.handleChange,
                                        required: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Lock /*className={classes.inputIconsColor}*//>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <CustomInput
                                    labelText="빵 설명"
                                    id="description"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        defaultValue: item.description,
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
                                    labelText="상세설명"
                                    id="detailDescription"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        defaultValue: item.detailDescription,
                                        multiline: true,
                                        onChange: this.handleChange,
                                        required: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <People /*className={classes.inputIconsColor}*//>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <div>
                                {
                                    ingredients.map((ingredient, index) => (
                                        <React.Fragment key={index}>
                                            <div className={wrapperDiv}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            id={ingredient.name+ingredient.origin}
                                                            defaultChecked={ingredient.checked}
                                                            onChange={this.handleChangeIngredients}
                                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                                            icon={<Check className={classes.uncheckedIcon} />}
                                                            classes={{ checked: classes.checked }}
                                                        />
                                                    }
                                                    classes={{ label: classes.label }}
                                                    label={`${ingredient.name}(${ingredient.origin})`}
                                                />
                                            </div>
                                        </React.Fragment>
                                    ))
                                }
                                </div>
                                <div>
                                {
                                    isCreating === false
                                        ?
                                        (
                                            <button onClick={this.toggleCreating}>+</button>
                                        )
                                        :
                                        (
                                            <React.Fragment>
                                                <CustomInput
                                                    labelText="재료 이름"
                                                    id="ingredientName"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        onChange: this.handleChange,
                                                        required: true,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Lock /*className={classes.inputIconsColor}*//>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                                <CustomInput
                                                    labelText="재료 원산지"
                                                    id="origin"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        onChange: this.handleChange,
                                                        required: true,
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Lock /*className={classes.inputIconsColor}*//>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                                <button onClick={this.handleAddIngredient}>재료추가</button>
                                            </React.Fragment>
                                        )
                                }
                                </div>
                                {
                                    this.dayTypes.map((day, index) => (
                                        <React.Fragment key={index}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        id={day}
                                                        defaultChecked={day.checked}
                                                        onChange={this.handleChangeDayTypes}
                                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{ checked: classes.checked }}
                                                    />
                                                }
                                                classes={{ label: classes.label }}
                                                label={day}
                                            />
                                        </React.Fragment>
                                    ))
                                }
                                
                                <div>
                                    <DropzoneArea onChange={this.handleChangeFile} filesLimit={1} />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.toggleUpdateBread} color="rose" simple size="lg">
                                    취소
                                </Button>
                                < Button color="primary" onClick={this.putBread} simple size="lg">
                                    빵 정보 수정완료
                                </Button>
                            </DialogActions>
                        </React.Fragment>
                    }
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(BreadModal);
