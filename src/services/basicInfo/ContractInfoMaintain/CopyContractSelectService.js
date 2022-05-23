import axios from 'configs/axios';

const API_LIST = {
  getScreenData: '/api/contract-info-maintain/copy-contract-select/getScreenData',
  ContractSearch: '/api/contract-info-maintain/copy-contract-select/ContractSearch',
  UpdateFlg: '/api/contract-info-maintain/copy-contract-select/UpdateFlg',
};

const CopyContractSelectService = {
  async getScreenData() {
    return axios.get(API_LIST.getScreenData);
  },

  async ContractSearch(data) {
    return axios.post(API_LIST.ContractSearch, data);
  },

  async UpdateFlg(data) {
    return axios.post(API_LIST.UpdateFlg, data);
  }
};

export default CopyContractSelectService;
