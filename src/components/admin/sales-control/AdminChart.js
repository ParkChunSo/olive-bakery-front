import React, {Component} from 'react'
import {Chart} from 'react-google-charts'

class AdminChart extends Component{
    state={
        chartData: []
    }
    componentWillReceiveProps(nextProps){
        const {chartData} = nextProps;
        
        let data = [['x', '매출']];
        for(let key in chartData){
            data.push([chartData[key].date, chartData[key].totalAve])
        }
        
        this.setState({
            chartData: data
        })
        
    }

    render(){
        console.log(this.state.chartData);
        return(
         <div>
             <Chart
                width={'100%'}
                height={'700px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.state.chartData}
                options={{
                    hAxis: {
                    title: '시간',
                    },
                    vAxis: {
                    title: '매출액',
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
                />
         </div>   
        )
    }
}

export default AdminChart;