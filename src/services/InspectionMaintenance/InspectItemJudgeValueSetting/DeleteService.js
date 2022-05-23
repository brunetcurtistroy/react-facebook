import axios from 'configs/axios'; 
const API_LIST = { 
    GetScreenData: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/delete/get-screen-data', 
    Run_F12: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/delete/run-f12',   
}

const DeleteService = {
  async GetScreenData(params){
    return axios.get(API_LIST.GetScreenData,{params});
  },
  async Run_F12(data) {
    return axios.delete(API_LIST.Run_F12 ,{data});
  } 
};  
export default DeleteService;