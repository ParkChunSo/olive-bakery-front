import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Title extends Component{
    render(){
        const {title, subTitle} = this.props;
        return (
            <Paper >
                <Typography variant="h5" component="h3">  
                    {title}
                </Typography>
                <Typography component="p">
                    {subTitle}
                </Typography>
            </Paper>
        )
    }
}

export default Title;