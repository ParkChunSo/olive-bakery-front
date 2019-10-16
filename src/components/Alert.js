import React from 'react';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "../react-dashboard/components/Snackbar/Snackbar.jsx";

class Alert extends React.Component{
    state = {
        open: true
    };

    closeAlert = () => {
        this.props.delAlert(this.props.message);
        this.setState({
           open: false
        });
    };

    render(){
        return(
            <div>
                <Snackbar
                    place="tc"
                    color="info"
                    icon={AddAlert}
                    message={this.props.message}
                    open={this.state.open}
                    closeNotification={this.closeAlert}
                    close
                />
            </div>
        );
    }
}
export default Alert;
