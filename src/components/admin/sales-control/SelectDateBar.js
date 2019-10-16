import React, {Component} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';

class SelectDateBar extends Component{
    state = {
        selectedYear:2019,
        selectedMonth:0
    }
    componentWillMount(){
        this.setState({
            selectedYear: this.props.selectedYear,
            selectedMonth: this.props.selectedMonth
        })
    }
    handleItemChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleButtonClick = () =>{
        console.log("selectedYear:" + this.state.selectedYear);
        console.log("selectedMonth:" + this.state.selectedMonth);
        this.props.callBack(this.state.selectedYear,this.state.selectedMonth);
    }
    render(){
        const {selectedYear, selectedMonth} = this.state;
        return(
            <span title="연도 선택">
                <FormControl variant="outlined">       
                    <InputLabel  htmlFor="outlined-age-simple">
                        연도
                    </InputLabel>
                    <Select
                    value={selectedYear}
                    onChange={this.handleItemChange}
                    labelWidth={40}
                    inputProps={{
                        name: 'selectedYear',
                        id: 'outlined-age-simple',
                    }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={2017}>2017년</MenuItem>
                        <MenuItem value={2018}>2018년</MenuItem>
                        <MenuItem value={2019}>2019년</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" >       
                    <InputLabel  htmlFor="outlined-age-simple">
                        월
                    </InputLabel>
                    <Select
                    value={selectedMonth}
                    onChange={this.handleItemChange}
                    labelWidth={40}
                    inputProps={{
                        name: 'selectedMonth',
                        id: 'outlined-age-simple',
                    }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>1월</MenuItem>
                        <MenuItem value={2}>2월</MenuItem>
                        <MenuItem value={3}>3월</MenuItem>
                        <MenuItem value={4}>4월</MenuItem>
                        <MenuItem value={5}>5월</MenuItem>
                        <MenuItem value={6}>6월</MenuItem>
                        <MenuItem value={7}>7월</MenuItem>
                        <MenuItem value={8}>8월</MenuItem>
                        <MenuItem value={9}>9월</MenuItem>
                        <MenuItem value={10}>10월</MenuItem>
                        <MenuItem value={11}>11월</MenuItem>
                        <MenuItem value={12}>12월</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={this.handleButtonClick}>
                    조회
                </Button>
            </span>
            
        )
    }
}

export default SelectDateBar