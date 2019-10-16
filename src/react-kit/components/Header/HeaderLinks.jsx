/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.jsx";
import Button from "../CustomButtons/Button.jsx";

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import purple from "@material-ui/core/colors/purple";
import {connect} from 'react-redux';
import * as authActions from '../../../store/modules/auth';
import storage from '../../../storage';


const linkStyle = {
    textDecoration: 'none',
    color: purple[800]
};

const fontStyle = {
    color: purple[800]
};

function HeaderLinks({ ...props }) {
  const { classes, logOut, logged } = props;
  const handleLogOut = () => {
      console.log('Logout');
      logOut();
  };
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
          {
              storage.get('logged')==null
                  ?
                  (<Link to="/signin" style={linkStyle}>
                  <Button
                      color="transparent"
                      target="_blank"
                      className={classes.navLink}
                  >
                      <CloudDownload className={classes.icons}/> LogIn
                  </Button>
              </Link>)
                  :
                  (<Link to="/signin" style={linkStyle}>
                      <Button
                      style={fontStyle}
                      color="transparent"
                      target="_blank"
                      className={classes.navLink}
                      onClick={handleLogOut}
                  >
                      <CloudDownload className={classes.icons}/> LogOut
                  </Button>
                      </Link>)
          }
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}

const mapStateToProps = (state) => ({
    logged: state.auth.logged
});
const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(authActions.logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks));
