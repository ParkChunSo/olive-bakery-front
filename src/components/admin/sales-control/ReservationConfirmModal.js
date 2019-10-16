import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ReservationConfirmModal extends Component{
    state={
      selectedItem: {
          reservationBreads: [],
          price: 0,
          bringTime: '',
          reservationTime: '',
          memberName:''
      },
      update: false
    }

    render(){
        const {selectedItem} = this.props;
        if(this.props.open===false)
            return null;
        return(
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    예약정보
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {
                            selectedItem.reservationBreads.map((item, index)=>(
                                <p key={index}>{item.breadName} : {item.breadCount}개</p>
                            ))
                        }
                        <p>총 금액: {selectedItem.price}</p>
                        <p>수령시간: {selectedItem.bringTime}</p>
                        <p>예약시간: {selectedItem.reservationTime}</p>
                        <p>수령인: {selectedItem.memberName}</p>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }
}

export default ReservationConfirmModal;