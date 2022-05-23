import axios from 'configs/axios'; 
const API_LIST = { 
    GetScreenData: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/use-inspect-category/get-screen-data', 
    Run_F12: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/use-inspect-category/run-f12',   
}

const UseInspectCategoryService = {
  async GetScreenData(params){
    return axios.get(API_LIST.GetScreenData,{params});
  },
  async Run_F12(params) {
    return axios.post(API_LIST.Run_F12 ,params);
  } 
};  
export default UseInspectCategoryService;