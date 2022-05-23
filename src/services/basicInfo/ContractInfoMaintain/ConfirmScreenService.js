import axios from 'configs/axios';

const API_LIST = {
  getScreenData: '/api/contract-info-maintain/confirm-screen/getScreenData',
  CopyExec: '/api/contract-info-maintain/confirm-screen/CopyExec',
};

const ConfirmScreenService = {
  async getScreenData(data) {
    return axios.get(API_LIST.getScreenData, data);
  },

  async CopyExec(data) {
    return axios.post(API_LIST.CopyExec, data);
  },
};

export default ConfirmScreenService;
