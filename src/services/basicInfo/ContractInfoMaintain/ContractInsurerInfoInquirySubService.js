import axios from 'configs/axios';

const API_LIST = {
  INDEX: '/api/contract-info-maintain/contract-insurer-info-inquiry-sub/',
};

const ContractInsurerInfoInquirySubService = {
  async getInsuranceList(params) {
    return axios.get(API_LIST.INDEX, {
      params
    });
  },
};

export default ContractInsurerInfoInquirySubService;
