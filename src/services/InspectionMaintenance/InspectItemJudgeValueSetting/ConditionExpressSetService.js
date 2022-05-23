import axios from 'configs/axios'; 
const API_LIST = { 
    GetScreenData: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/condition-express-set/get-screen-data', 
    UpdateF12: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/condition-express-set/update',  
    Cancel: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/condition-express-set/cancel',  
    CorrectF03: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/condition-express-set/correct',  
    RedisplayF11: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/condition-express-set/redisplay',  

}

const ConditionExpressSetService = {
  async GetScreenData(params){
    return axios.get(API_LIST.GetScreenData,{params});
  },
  async UpdateF12(data) {
    return axios.put(API_LIST.UpdateF12 ,data);
  }, 
  async Cancel(params) {
    return axios.get(API_LIST.Cancel ,{params});
  }, 
  async CorrectF03(params){
    return axios.get(API_LIST.CorrectF03,{params});
  },
  async RedisplayF11(params){
    return axios.get(API_LIST.RedisplayF11,{params});
  },
}; 
export default ConditionExpressSetService;