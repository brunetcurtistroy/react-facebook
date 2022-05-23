import axios from 'configs/axios';

const API_LIST = {
  INDEX: '/api/contract-info-maintain/contract-office-info-inquiry-sub/',
};

const ContractOfficeInfoInquirySubService = {
  async getPlanList(params) {
    return axios.get(API_LIST.INDEX, {
      params: {
        Li_Type: params.Li_Type,
      },
    });
  },
};

export default ContractOfficeInfoInquirySubService;
