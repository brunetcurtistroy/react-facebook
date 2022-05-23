import axios from 'configs/axios'; 
const API_LIST = { 
    GetScreenData: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/use-inspect/get-screen-data', 
    Run_F12: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/use-inspect/run-f12',   
}

const UseInspectService = {
  async GetScreenData(params){
    return axios.get(API_LIST.GetScreenData,{params});
  },
  async Run_F12(params) {
    return axios.post(API_LIST.Run_F12 ,params);
  } 
};  
export default UseInspectService;