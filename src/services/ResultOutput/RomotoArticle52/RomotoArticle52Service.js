import axios from 'configs/axios';

const apiPaths = {
  getScreenDataRomotoArticle52: '/api/romoto-article52/romoto-article52',
  extractRomotoArticle52: '/api/romoto-article52/romoto-article52/extract',
  getDataIssueList: '/api/romoto-article52/romoto-article52/issue-list',
  selectAllRomotoArticle52: '/api/romoto-article52/romoto-article52/vl3-sts-select-all-change', 
  selectRomotoArticle52: '/api/romoto-article52/romoto-article52/issuing-change',
  getValueEnable: '/api/romoto-article52/romoto-article52/change-input',
  printF12: '/api/romoto-article52/romoto-article52/f12',
  getNameOfficeCode: '/api/romoto-article52/romoto-article52/get-name-office'
};

const RomotoArticle52Service = {
  async getScreenDataRomotoArticle52Service(params) {
    return axios.get(apiPaths.getScreenDataRomotoArticle52, { params });
  },
  async extractRomotoArticle52Service(params) {
    return axios.post(apiPaths.extractRomotoArticle52, params);
  },
  async getDataIssueListService(params) {
    return axios.get(apiPaths.getDataIssueList, { params });
  },
  async selectAllRomotoArticle52Service(params) {
    return axios.post(apiPaths.selectAllRomotoArticle52, params);
  },
  async selectRomotoArticle52Service(params) {
    return axios.post(apiPaths.selectRomotoArticle52, params);
  },
  async getValueEnableService(params) {
    return axios.post(apiPaths.getValueEnable, params);
  },
  async printF12(params) {
    return axios.get(apiPaths.printF12, { params, responseType: "blob" });
  },
  async getNameOfficeCodeService(params) {
    return axios.get(apiPaths.getNameOfficeCode, { params });
  },
};

export default RomotoArticle52Service;
