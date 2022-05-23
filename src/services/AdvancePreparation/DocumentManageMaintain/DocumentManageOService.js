import axios from 'configs/axios';

const API_LIST = {
    getScreenData: '/api/document-manage-maintain/document-manage-o'
};

const DocumentManageOService = {
  async getScreenData(params) {
    return axios.get(API_LIST.getScreenData, {params});
  }
};

export default DocumentManageOService;
