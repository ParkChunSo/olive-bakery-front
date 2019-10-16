import React, { Component } from "react";

class Profile extends Component{
    render(){
        const {userData} = this.props;
        if(userData === undefined){
            return (<div>데이터를 불러오는데 실패했습니다.</div>);
        }
        console.log(userData);
        return(
            <div>
                <div>
                    <p>아이디: {userData.id}</p>
                </div>
                
                <div>
                    <p>이름: {userData.name}</p>
                </div>

                <div>
                    <p>핸드폰번호: {userData.phoneNumber}</p>
                </div>

                <div>
                    <p>도장 개수: {userData.stamp}</p>
                </div>
            </div>
        )
    }
}
export default Profile;