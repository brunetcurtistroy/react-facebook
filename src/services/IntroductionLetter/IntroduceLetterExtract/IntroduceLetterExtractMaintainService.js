import axios from "configs/axios";

const API_LIST = {
  dblClick:"/api/introduce-letter-extract/introduce-letter-extract-maintain/dbl-click",
  getScreenData: '/api/introduce-letter-extract/introduce-letter-extract-maintain/get-screen-data',
  inspectinquiry: '/api/introduce-letter-extract/introduce-letter-extract-maintain/inspectinquiry',
  printF08After: '/api/introduce-letter-extract/introduce-letter-extract-maintain/print-f08-after',
  specifyinput: '/api/introduce-letter-extract/introduce-letter-extract-maintain/specifyinput',
  saveData: '/api/introduce-letter-extract/introduce-letter-extract-maintain/save-data', // post
  deleteData: '/api/introduce-letter-extract/introduce-letter-extract-maintain/delete-data',
  printF08Before: '/api/introduce-letter-extract/introduce-letter-extract-maintain/print-f08-before',
  departmentApi: '/api/introduce-letter-extract/introduce-letter-extract-maintain/getName-department',
  doctorCodeApi: '/api/introduce-letter-extract/introduce-letter-extract-maintain/getName-doctor-code',
  generalCommentCodeApi: '/api/introduce-letter-extract/introduce-letter-extract-maintain/getName-general-comment-code'

};

const IntroduceLetterExtractMaintainService = {
  async departmentApi(params) {
    return axios.get(API_LIST.departmentApi, { params });
  },
  async doctorCodeApi(params) {
    return axios.get(API_LIST.doctorCodeApi, { params });
  },
  async generalCommentCodeApi(params) {
    return axios.get(API_LIST.generalCommentCodeApi, { params });
  },
  async dblClick(params) {
    return axios.get(API_LIST.dblClick, { params });
  },
  async getScreenData(params) {
    return axios.get(API_LIST.getScreenData, { params })
  },
  async inspectinquiry(params) {
    return axios.get(API_LIST.inspectinquiry, {params})
  },
  async printF08After(params) {
    return axios.get(API_LIST.printF08After, {params, responseType: 'blob'})
  },
  async specifyinput(params) {
    return axios.get(API_LIST.specifyinput, {params})
  },
  async printF08Before(params) {
    return axios.get(API_LIST.printF08Before, {params})
  },
  async saveData(params) {
    return axios.post(API_LIST.saveData, params)
  },
  async deleteData(params) {
    return axios.delete(API_LIST.deleteData, { params})
  }


};

export default IntroduceLetterExtractMaintainService;