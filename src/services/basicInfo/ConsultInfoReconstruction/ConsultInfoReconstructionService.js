import axios from 'configs/axios';

const API_LIST = {
    DisplayBtn: '/api/consult-info-reconstruction/inspect-changes/DisplayBtn',
    Redeploy_F12: '/api/consult-info-reconstruction/inspect-changes/Redeploy_F12',
    changeOfficeCode: '/api/consult-info-reconstruction/inspect-changes/get-info-office-code',
    getListData: '/api/consult-info-reconstruction/inspect-changes/get-list-data',
    select: '/api/consult-info-reconstruction/inspect-changes/select-switching'
};

const ConsultInfoReconstructionService = {
  async getListData(params) {
    return axios.get(API_LIST.getListData);
  },
  async DisplayBtn(params) {
    return axios.post(API_LIST.DisplayBtn, params);
  },
  async Redeploy_F12(params) {
    return axios.post(API_LIST.Redeploy_F12, params);
  },
  async changeOfficeCode(params) {
    return axios.get(API_LIST.changeOfficeCode, {params});
  },
  async selectChange(params) {
    return axios.post(API_LIST.select, params);
  },
};

export default ConsultInfoReconstructionService;
