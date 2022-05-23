import axios from 'configs/axios';

const API_LIST = {
    getDataFormatQuery: '/api/document-manage-maintain/format-query',
    getDataFormatContent: '/api/document-manage-maintain/format-query/format-content',
};

const WS1544002FormatQueryService = {
  async getDataFormatQueryService(params) {
    return axios.get(API_LIST.getDataFormatQuery, {params});
  },

  async getDataFormatContentService(params) {  
    return axios.get(API_LIST.getDataFormatContent, {params});
  }
};

export default WS1544002FormatQueryService;
