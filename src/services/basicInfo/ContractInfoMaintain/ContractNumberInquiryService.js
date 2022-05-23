import axios from 'configs/axios';

const API_LIST = {
  INDEX: '/api/contract-info-maintain/contract-number-inquiry/',
};

const ContractNumberInquiryService = {
  async getTermList(params) {
    return axios.get(API_LIST.INDEX, {
      params: {
        Li_ContractType: params.Li_ContractType,
        Li_ContractOrgCode: params.Li_ContractOrgCode,
        Li_ContractStartDate: params.Li_ContractStartDate,
      },
    });
  },
};

export default ContractNumberInquiryService;
