import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ReservationConfirmModal from "./ReservationConfirmModal";

class AdminReservation extends Component{
    state = {
        modalOpen: false,
        reservationData: [],
        selectedItem: []
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            reservationData: nextProps.reservationData
        });
    }
    toggleTableModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    };
    handleRowClick = (event, id) =>{
        const {reservationData} = this.state;
        const item = reservationData.filter(reservationData => reservationData.reservationId === parseInt(id))[0];
        this.setState({
            modalOpen: !this.state.modalOpen,
            selectedItem: {
                bringTime: item.bringTime,
                memberName: item.memberName,
                price: item.price,
                reservationBreads: item.reservationBreads,
                reservationId: item.reservationId,
                reservationTime: item.reservationTime
            }
        });
    }
    render(){
        const {reservationData} = this.state;
        return(
            <React.Fragment>
                <ReservationConfirmModal
                        open={this.state.modalOpen}
                        onClose={this.toggleTableModal}
                        selectedItem={this.state.selectedItem}
                 />
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>예약번호</TableCell>
                                <TableCell align="right">금액&nbsp;(원)</TableCell>
                                <TableCell align="right">예약자</TableCell>
                                <TableCell align="right">예약시간</TableCell>
                                <TableCell align="right">수령시간</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                reservationData.map(row => (
                                    <TableRow key={row.reservationId} onClick= {event => this.handleRowClick(event, row.reservationId)}>
                                        <TableCell component="th" scope="row">
                                            {row.reservationId}
                                        </TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                        <TableCell align="right">{row.memberName}</TableCell>
                                        <TableCell align="right">{row.reservationTime}</TableCell>
                                        <TableCell align="right">{row.bringTime}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        )
    }
}

export default AdminReservation