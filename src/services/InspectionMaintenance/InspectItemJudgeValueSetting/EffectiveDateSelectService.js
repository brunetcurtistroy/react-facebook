import axios from 'configs/axios'; 
const API_LIST = { 
    getScreenData363: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/effective-date-select-0363', 
    getScreenData364: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/effective-date-select-0364',  
}

const EffectiveDateSelectService = {
  async GetScreenData363(){
    return axios.get(API_LIST.getScreenData363);
  },
  async GetScreenData364() {
    return axios.get(API_LIST.getScreenData364 );
  },  
};

export default EffectiveDateSelectService;