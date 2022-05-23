import axios from 'configs/axios'; 
const API_LIST = { 
    GetScreenData: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/copy-category/get-screen-data', 
    Run_F12: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/copy-category/run-f12',   
}

const CopyCategoryService = {
  async GetScreenData(params){
    return axios.get(API_LIST.GetScreenData,{params});
  },
  async Run_F12(params) {
    return axios.post(API_LIST.Run_F12 ,params);
  } 
};  
export default CopyCategoryService;