import React, {Component, Fragment} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import AdminChart from "./AdminChart"
import AdminReservation from "./AdminReservation"
import SelectDateBar from './SelectDateBar';

import * as api from "../../../common/Api"
import Title from "../../../common/Title"
import './AdminDashboard.css'


class AdminDashboard extends Component{
    state={
        reservatoinSelectDate: "",
        reservationData: [],
        selectedItem: {},
        modalOpen: false,        
        selectedYear: 2019,
        selectedMonth: 1,
        selectedDay: 1,
        detailsSalesData: [],
        graphData: []
    }

    componentDidMount(){
        this.getChartDataByYearAndMonth(this.state.selectedYear, this.state.selectedMonth);
        this.getReservationDataByDate(this.state.reservatoinSelectDate);
    };

    componentWillMount(){
        const today = new Date();
        const date = this.convertDate2String(today.getFullYear(), (today.getMonth() + 1), today.getDate())

        this.setState({ 
            selectedYear: today.getFullYear(),
            selectedMonth: (today.getMonth() + 1),
            reservatoinSelectDate: date 
        });
    };

    convertDate2String = (year, month, day) =>{
        let date = year.toString();
        if(month < 10){
            date +=  ('-0' + month);
        }else{
            date += ('-' + month);
        }

        if(day < 10){
            date +=  ('-0' + day);
        }else{
            date += ('-' + day);
        }

        return date;
    }

    handleItemChange = (event) =>{
        const selectedDay = event.target.value;

        this.setState({
            selectedDay: selectedDay,
            reservatoinSelectDate: this.convertDate2String(this.state.selectedYear, this.state.selectedMonth, selectedDay)
        });
        
        this.getReservationDataByDate(this.convertDate2String(this.state.selectedYear, this.state.selectedMonth, selectedDay))
    }

    getReservationDataByDate = async (selectDate) =>{
        const response = await api.getReservationDataByDate(selectDate);
        
        if(response === undefined || response === null || response === ""){
            console.log("값을 받아오는데 문제가 발생했습니다.");
            return;
        }
        this.setState({
            reservationData: response.map(data=>({...data, checked:'false'}))
        });
    };

    getChartData = async () =>{
        const response = await api.getGraphData();

        if(response === undefined || response === null || response === ""){
            console.log("값을 받아오는데 문제가 발생했습니다.");
            return;
        }

        this.setState({
            graphData: response.map(data => ({date: data.date[0].toString(), totalAve: data.totalAve})),
            detailsSalesData: response.map(data => ({date: data.date[0], totalAve: data.totalAve, byTypes: data.byTypes}))
        })
    };

    getChartDataByYear = async (year) =>{
        const response = await api.getGraphDataByYear(year);

        if(response === undefined || response === null || response === ""){
            console.log("값을 받아오는데 문제가 발생했습니다.");
            return;
        }

        this.setState({
            graphData: response.map(data => ({date: data.date[0].toString() + '-' + data.date[1].toString(), totalAve: data.totalAve})),
            detailsSalesData: response.map(data => ({date: data.date[0], totalAve: data.totalAve, byTypes: data.byTypes}))
        })
    };

    getChartDataByYearAndMonth = async (year, month) =>{
        const response = await api.getGraphDataByYearAndMonth(year, month);

        if(response === undefined || response === null || response === ""){
            return;
        }
        console.log(response);

        this.setState({
            graphData: response.map(data => ({date: data.date[0].toString() + '-' + data.date[1].toString() +'-'+ data.date[2].toString(), totalAve: data.totalAve})),
            detailsSalesData: response.map(data => ({date: data.date[0], totalAve: data.totalAve, byTypes: data.byTypes}))
        })
    };

    callBackSelectBar = (selectedYear, selectedMonth) =>{
        this.setState({
            selectedYear: selectedYear,
            selectedMonth: selectedMonth
        });

        console.log(selectedMonth);

        if(selectedYear === 0 || selectedYear === ""){
            this.getChartData();
        }else if(selectedMonth === 0 || selectedMonth === ""){
            this.getChartDataByYear(selectedYear);
        }else{
            this.getChartDataByYearAndMonth(selectedYear, selectedMonth);
        }

        const date = this.convertDate2String(selectedYear, selectedMonth, 1);
        this.getReservationDataByDate(date);
    }
    

    render(){
        const {reservationData, selectedYear, selectedMonth, selectedDay} = this.state;
        return (
                <div>
                    <div className='chart-div'>
                        <div>
                            <SelectDateBar
                                selectedYear={selectedYear}
                                selectedMonth = {selectedMonth}
                                callBack= {this.callBackSelectBar}
                            />
                        </div>
                        <div>
                            <AdminChart
                                chartData= {this.state.graphData}
                            />
                        </div>
                    </div>
                    <div>
                        <div className= 'wrapper'>
                            <div>
                                <Title
                                    title="예약확인"
                                    subTitle="날짜별 예약을 확인합니다."
                                />
                            </div>
                            <FormControl variant="outlined" >   
                                <InputLabel  htmlFor="outlined-age-simple">
                                    일
                                </InputLabel>
                                <Select
                                value={selectedDay}
                                onChange={this.handleItemChange}
                                labelWidth={40}
                                inputProps={{
                                    name: 'selectedDay',
                                    id: 'outlined-age-simple',
                                }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>1일</MenuItem>
                                    <MenuItem value={2}>2일</MenuItem>
                                    <MenuItem value={3}>3일</MenuItem>
                                    <MenuItem value={4}>4일</MenuItem>
                                    <MenuItem value={5}>5일</MenuItem>
                                    <MenuItem value={6}>6일</MenuItem>
                                    <MenuItem value={7}>7일</MenuItem>
                                    <MenuItem value={8}>8일</MenuItem>
                                    <MenuItem value={9}>9일</MenuItem>
                                    <MenuItem value={10}>10일</MenuItem>
                                    <MenuItem value={11}>11일</MenuItem>
                                    <MenuItem value={12}>12일</MenuItem>
                                    <MenuItem value={13}>13일</MenuItem>
                                    <MenuItem value={14}>14일</MenuItem>
                                    <MenuItem value={15}>15일</MenuItem>
                                    <MenuItem value={16}>16일</MenuItem>
                                    <MenuItem value={17}>17일</MenuItem>
                                    <MenuItem value={18}>18일</MenuItem>
                                    <MenuItem value={19}>19일</MenuItem>
                                    <MenuItem value={20}>20일</MenuItem>
                                    <MenuItem value={21}>21일</MenuItem>
                                    <MenuItem value={22}>22일</MenuItem>
                                    <MenuItem value={23}>23일</MenuItem>
                                    <MenuItem value={24}>24일</MenuItem>
                                    <MenuItem value={25}>25일</MenuItem>
                                    <MenuItem value={26}>26일</MenuItem>
                                    <MenuItem value={27}>27일</MenuItem>
                                    <MenuItem value={28}>28일</MenuItem>
                                    <MenuItem value={29}>29일</MenuItem>
                                    <MenuItem value={30}>30일</MenuItem>
                                    <MenuItem value={31}>31일</MenuItem>
                                </Select>
                            </FormControl>
                            <AdminReservation
                                reservationData={reservationData}
                            />
                        </div>
                        
                        <div className= 'wrapper'>
                            <p>aaaa</p>
                        </div>
                    </div>
                </div>
        )
    };

}
export default AdminDashboard;

