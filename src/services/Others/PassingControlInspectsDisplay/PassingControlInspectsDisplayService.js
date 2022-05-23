import axios from 'configs/axios';

const API_LIST = {
  getScreenData: '/api/passing-control-inspects-display/passing-control-inspects-display/getscreendata',
  getStatusList: '/api/passing-control-inspects-display/passing-control-inspects-display/getstatuslist',
  acceptedState: '/api/passing-control-inspects-display/passing-control-inspects-display/acceptedstate',
  carriedOutState: '/api/passing-control-inspects-display/passing-control-inspects-display/carriedoutstate',
  cancel: '/api/passing-control-inspects-display/passing-control-inspects-display/cancel',
  unmeasurable: '/api/passing-control-inspects-display/passing-control-inspects-display/unmeasurable',
  changeStateUpdate: '/api/passing-control-inspects-display/passing-control-inspects-display/changestateupdate',
};

const PassingControlInspectsDisplayService = {
  async getScreenData(params) {
    return axios.get(API_LIST.getScreenData, { params });
  },
  async getStatusList(params) {
    return axios.get(API_LIST.getStatusList, { params });
  },
  async acceptedState(params) {
    return axios.get(API_LIST.acceptedState, { params });
  },
  async carriedOutState(params) {
    return axios.get(API_LIST.carriedOutState, { params });
  },
  async cancel(params) {
    return axios.get(API_LIST.cancel, { params });
  },
  async unmeasurable(params) {
    return axios.get(API_LIST.unmeasurable, { params });
  },
  async changeStateUpdate(params) {
    return axios.get(API_LIST.changeStateUpdate, { params });
  },
};

export default PassingControlInspectsDisplayService;

