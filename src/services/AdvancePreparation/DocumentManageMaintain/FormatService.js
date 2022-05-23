import axios from 'configs/axios';

const API_LIST = {
    getScreenData: '/api/document-manage-maintain/format'
};

const FormatService = {
  async getScreenData(params) {
    return axios.get(API_LIST.getScreenData, {params});
  }
};

export default FormatService;
