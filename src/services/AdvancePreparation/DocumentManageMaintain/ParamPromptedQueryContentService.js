import axios from 'configs/axios';

const API_LIST = {
    getDataScreen: '/api/document-manage-maintain/param-prompted-query-content',
};

const ParamPromptedQueryContentService = {
  async getDataScreen(params) {
    return axios.get(API_LIST.getDataScreen, {params});
  }
};

export default ParamPromptedQueryContentService;
