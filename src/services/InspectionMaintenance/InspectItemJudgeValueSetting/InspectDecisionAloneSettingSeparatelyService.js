import axios from 'configs/axios'; 
const API_LIST = {
    //363 /506
    getScreenData: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/get-screen-data-separately', 
    getDataDetail : '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/inspect-decision-alone-setting-separately', 
    UpdateScreenData:'/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/inspect-decision-alone-setting-separately/update-screen-data',
    UpdateDataList:'/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/inspect-decision-alone-setting-separately/update-table-data',
    Gzoom_EffectiveDateChar:'/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/inspect-decision-alone-setting-separately/gzoom-effective-date-char',
    //364 
    getScreenData364: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/get-screen-data-merged', 
    getDataDetail364 : '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/inspect-decision-alone-setting-merged',
    Gzoom_EffectiveDateChar364 :'/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/inspect-decision-alone-setting-merged/gzoom-effective-date-char' ,
    UpdateDataList364:'/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/inspect-decision-alone-setting-merged/update-table-data'
  }

const InspectDecisionAloneSettingSeparatelyService = {
  async GetScreenData(params) {
    return axios.get(API_LIST.getScreenData,{params});
  },
  async GetDataDetail(params) {
    return axios.get(API_LIST.getDataDetail, {params} );
  }, 
  async UpdateScreenData(data) {
    return axios.put(API_LIST.UpdateScreenData, data );
  },
  async UpdateDataList(data) {
    return axios.put(API_LIST.UpdateDataList, data);
  },
  async Gzoom_EffectiveDateChar(data) {
    return axios.get(API_LIST.Gzoom_EffectiveDateChar, data);
  },
  async GetScreenData364(params) {
    return axios.get(API_LIST.getScreenData364, {params});
  },
  async GetDataDetail364(params) {
    return axios.get(API_LIST.getDataDetail364, {params});
  },
  async Gzoom_EffectiveDateChar364(params) {
    return axios.get(API_LIST.Gzoom_EffectiveDateChar364, {params});
  },
  async UpdateDataList364(data) {
    return axios.put(API_LIST.UpdateDataList364, data);
  },
};

export default InspectDecisionAloneSettingSeparatelyService;
