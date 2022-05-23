import axios from 'configs/axios'; 
const API_LIST = { 
    GetScreenData: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/copy/get-screen-data', 
    Run_F12: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/copy/run-f12',   
}

const CopyService = {
  async GetScreenData(params){
    return axios.get(API_LIST.GetScreenData,{params});
  },
  async Run_F12(data) {
    return axios.post(API_LIST.Run_F12 ,data);
  } 
}; 
export default CopyService;