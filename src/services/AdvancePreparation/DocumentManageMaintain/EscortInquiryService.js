import axios from 'configs/axios';

const API_LIST = {
    getScreenData: '/api/document-manage-maintain/escort-inquiry'
};

const EscortInquiryService = {
  async getScreenData(params) {
    return axios.get(API_LIST.getScreenData, {params});
  }
};

export default EscortInquiryService;
