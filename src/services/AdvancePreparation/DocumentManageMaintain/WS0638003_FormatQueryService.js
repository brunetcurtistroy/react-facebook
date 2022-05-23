import axios from 'configs/axios';

const API_LIST = {
    getDataFormatQuery: '/api/document-manage-maintain/format-query-WS0638003',
    getDataFormatContent: '/api/document-manage-maintain/format-query-WS0638003/format-content',
};

const WS0638003_FormatQueryService = {
  async getDataFormatQueryService(params) {
    return axios.get(API_LIST.getDataFormatQuery, {params});
  },

  async getDataFormatContentService(params) {  
    return axios.get(API_LIST.getDataFormatContent, {params});
  }
};

export default WS0638003_FormatQueryService;
