import axios from 'configs/axios';

const API_LIST = {
    update: '/api/consult-info-reconstruction/condition-add-sub/update',
    getScreenData: '/api/consult-info-reconstruction/condition-add-sub/getScreenData',
    clearData: '/api/consult-info-reconstruction/condition-add-sub/clear',
    getNameOfficeCode: '/api/consult-info-reconstruction/condition-add-sub/get-name-office-code',
    getNamePersonal: '/api/consult-info-reconstruction/condition-add-sub/get-name-personal-num',
};

const ConditionAddSubService = {
  async update(params) {
    return axios.post(API_LIST.update, params);
  },

  async getScreenData(params) {
    return axios.get(API_LIST.getScreenData, {params});
  },

  async clearData(params) {
    return axios.post(API_LIST.clearData, params);
  },

  async getNameOfficeCodeService(params) {
    return axios.get(API_LIST.getNameOfficeCode, {params});
  },

  async getNamePersonalService(params) {
    return axios.get(API_LIST.getNamePersonal, {params});
  },
};

export default ConditionAddSubService;