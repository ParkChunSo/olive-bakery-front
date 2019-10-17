import storage from "../storage";
import axios from "axios";

const token = storage.get('token');
const url = "http://15.164.57.47:8080/olive/";
// const url = "http://172.30.1.39:8080/olive/";

////////////////////// 사용자 프로필 관련 //////////////////////

export async function getUserData(){
    const response = await axios.get(url + `sign/check`, { headers: {'Authorization': token}});
    if(response.status===200){
        return response.data;
    }
    return null;

};

export function putUserData(userData){
    const response = axios.put(url + 'sign', {headers: { 'Content-type': 'application/json', 'Authorization': token},
        "age": userData.age,
        "id": userData.id,
        "male": userData.male,
        "name": userData.name,
        "phoneNumber": userData.phoneNumber,
        "pw": userData.password });
    if(response.status===200){
        return true;
    }
    return false;
};

export async function getReservationDataByUser(type){
    const response = await axios.get(url + `reservation/user/type/${type}`
                    , { headers: { 'Content-type': 'application/json', 'Authorization': token}});
        if(response.status === 200){
            return response.data;
        }
        return null;
}

////////////////////// 빵 관련 //////////////////////

// 모든 빵 정보 가져오기
export async function getAllBreads(){
    const response = await axios.get(url + 'bread',);
    if(response.status === 200){
        return response.data;
    }
    else{
        return null;
    }
}

//빵 저장
export function saveBread(breadData, file){
    const formData = new FormData();
    const json = JSON.stringify(breadData);
    formData.append("file", file);
    formData.append('json', json);
    const response = axios.post(url + 'bread', formData, {headers: {"content-type": "multipart/form-data", "Authorization": token}})
    
    return response.status
    
}

//재료와 원산지 가져오기
export async function getIngrediants(){
    const response = await axios.get(url + 'bread/ingredients',{headers: {"Authorization": token}})
    if(response.status === 200){
        return response.data;
    }
    else{
        return null;
    }
}

// 빵 정보 수정
export async function updateBread(breadData, file){
    console.log(file);
    
    const formData = new FormData();
    const json = JSON.stringify(breadData);
    formData.append('json', json);
    if(file !== undefined || file !== null){
        formData.append("file", file);
    }
    
    const response = await axios.put(url + 'bread', formData, {headers: {'Content-type': 'application/json', "Authorization": token}});
    return response.status;
}

// 빵 매진 상태 수정
export async function updateStateOfSoldOut(breadId, sold_out){
    const response = await axios.put(url + `bread/id/${breadId}/sold_out/${sold_out}`,{}, {headers: {"Authorization": token}})
    return response.status;
}

// 빵 추천 상태 수정
export async function updateStatus(breadId, status){
    const response = await axios.put(url + `bread/id/${breadId}/state/${status}`,{}, {headers: {"Authorization": token}})
    return response.status;
}

//빵 삭제
export async function deleteBread(breadId, isDelete){
    const response = await axios.delete(url + `bread/id/${breadId}/delete/${isDelete}`,{headers: { 'Authorization': token}});
    return response.status;
}

////////////////////// 게시판 관련 //////////////////////

export function getBoardById(boardId){
    return axios.get(url + `board/id/${boardId}`, {headers: { 'Authorization': token}})
}
export function saveComment(boardId, userId, content, userName){
    return axios.post(url + 'board/comment', {headers: {'Content-type': 'application/json','Authorization': token},
        "boardId": boardId,
        "content": content,
        "updateTime": "null",
        "userId": userId,
        "userName": userName
    });
}

////////////////////// 예약 관련 //////////////////////

export function updateReservatioinState(reservationId){
    return axios.put(`http://15.164.57.47:8080/olive/reservation/${reservationId}`
        ,{},{headers: { 'Content-type': 'application/json', 'Authorization': token}});
}

////////////////////// 그래프 관련 //////////////////////

export async function getReservationDataByDate(date){
    const response = await axios.post(url + 'reservation/date', {
        "reservationType": "COMPLETE",
        "selectDate": date
    }, { headers: { 'Content-type': 'application/json', 'Authorization': token } });
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export async function getReservationDataByRange(startDate, endDate){
    const response = await axios.post(url + 'reservation/date', {
        "reservationType": "COMPLETE",
        "startDate": startDate,
        "endDate": endDate
    }, { headers: { 'Content-type': 'application/json', 'Authorization': token } });
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export async function getGraphData(){
    const response = await axios.get(url + 'sales/graph', { headers: { 'Authorization': token } });
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export async function getGraphDataByYear(year){
    const response = await axios.get(url + `sales/graph/year/${year}`, { headers: { 'Authorization': token } });
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export async function getGraphDataByYearAndMonth(year, month){
    const response = await axios.get(url + `sales/graph/year/${year}/month/${month}`, { headers: { 'Authorization': token } });
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export function saveOfflineSale(date, sales){
    return axios.post(url + 'sales', {date: date, sales: sales}, {headers: { 'Authorization': token }});
}