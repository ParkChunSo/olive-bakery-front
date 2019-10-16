import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/LockOutlined";
// core components
/*import Header from "../react-kit/components/Header/Header.jsx";
import HeaderLinks from "../react-kit/components/Header/HeaderLinks.jsx";
import Footer from "../react-kit/components/Footer/Footer.jsx";*/
import GridContainer from "../react-kit/components/Grid/GridContainer.jsx";
import GridItem from "../react-kit/components/Grid/GridItem.jsx";
import Button from "../react-kit/components/CustomButtons/Button.jsx";
import Card from "../react-kit/components/Card/Card.jsx";
import CardBody from "../react-kit/components/Card/CardBody.jsx";
import CardHeader from "../react-kit/components/Card/CardHeader.jsx";
import CardFooter from "../react-kit/components/Card/CardFooter.jsx";
import CustomInput from "../react-kit/components/CustomInput/CustomInput.jsx";

import loginPageStyle from "../react-kit/assets/jss/material-kit-react/views/loginPage.jsx";

import bg1 from "../olive_bakery_img_etc/bg1.jpg";

import SignUpForm from "./SignUpForm";

import axios from "axios";

class SignInForm extends React.Component {
    state = {
        cardAnimation: "cardHidden",
        ID: "",
        password: "",
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        setTimeout(
            function() {
                this.setState({ cardAnimation: "" });
            }.bind(this),
            400
        );
    }
    postLogin = () => {
        axios.post('http://15.164.57.47:8080/olive/sign', {
            headers: { 'Content-type': 'application/json', },
            "id": this.state.ID,
            "pw": this.state.password
        }).then(response => {
            //this.props.onReceive(response.data.number);
            if(response.status===200){
                let tok = {tok: 'Bearer '+response.data, email: this.state.ID, password: this.state.password};
                this.props.saveToken(tok);
                this.props.addAlert('로그인 완료');
            }
        });
    };
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div>
                <div
                    style={{
                        backgroundImage: "url(" + bg1 + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                    }}
                >
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <Card className={classes[this.state.cardAnimation]}>
                                    <form className={classes.form}>
                                        <CardHeader color="primary" className={classes.cardHeader}>
                                            <h4>Login</h4>
                                            <div className={classes.socialLine}>
                                                <Button
                                                    justIcon
                                                    href="#pablo"
                                                    target="_blank"
                                                    color="transparent"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className={"fab fa-twitter"} />
                                                </Button>
                                                <Button
                                                    justIcon
                                                    href="#pablo"
                                                    target="_blank"
                                                    color="transparent"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className={"fab fa-facebook"} />
                                                </Button>
                                                <Button
                                                    justIcon
                                                    href="#pablo"
                                                    target="_blank"
                                                    color="transparent"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className={"fab fa-google-plus-g"} />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <p className={classes.divider}>Olive Organic Bakery</p>
                                        <CardBody>
                                            <CustomInput
                                                labelText="E-mail"
                                                id="ID"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    onChange: this.handleChange,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <People className={classes.inputIconsColor} />
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
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Lock className={classes.inputIconsColor}/>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </CardBody>
                                        <CardFooter className={classes.cardFooter}>
                                            <Button simple color="primary" size="lg" onClick={this.postLogin}>
                                                로그인
                                            </Button>
                                            <SignUpForm addAlert={this.props.addAlert}/>
                                        </CardFooter>
                                    </form>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(loginPageStyle)(SignInForm);
