import axios from 'configs/axios';

const API_LIST = { 
    getScreenData: '/api/consult-info-reconstruction/acceptance-process-menu',
    RunBtnInsuranceCardReader: '/api/consult-info-reconstruction/acceptance-process-menu/run-btn/insurance-card-reader',
    OrderTransmission : '/api/consult-info-reconstruction/acceptance-process-menu/run-btn/order-transmission',
    ConsultVotePrint: '/api/consult-info-reconstruction/acceptance-process-menu/run-btn/consult-vote-print',
    CardIssuance: '/api/consult-info-reconstruction/acceptance-process-menu/run-btn/card-issuance',
};

const AcceptanceProcessMenuService = { 
  async getScreenData(params) {
    return axios.get(API_LIST.getScreenData, {params});
  },
  async RunBtnInsuranceCardReader(params) {
    return axios.post(API_LIST.RunBtnInsuranceCardReader, params);
  },
  async OrderTransmission(params) {
    return axios.post(API_LIST.OrderTransmission, params);
  },
  async ConsultVotePrint(params) {
    return axios.post(API_LIST.ConsultVotePrint, params);
  },
  async CardIssuance(params) {
    return axios.post(API_LIST.CardIssuance, params);
  },
};

export default AcceptanceProcessMenuService;