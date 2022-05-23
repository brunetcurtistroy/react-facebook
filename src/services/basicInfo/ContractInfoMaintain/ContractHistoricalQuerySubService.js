import axios from 'configs/axios';

const API_LIST = {
  INDEX: '/api/contract-info-maintain/contract-historical-query-sub/',
};

const ContractHistoricalQuerySubService = {
  async getHistoryList(params) {
    return axios.get(API_LIST.INDEX, {
      params: {
        Li_ContractType: params.Li_ContractType,
        Li_ContractOrgCode: params.Li_ContractOrgCode,
      },
    });
  },
};

export default ContractHistoricalQuerySubService;
