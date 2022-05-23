import axios from "configs/axios";

const API_LIST = {
  GetScreenData: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-inspect-maintain/get-screen-data',
  GetListData: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-inspect-maintain/get-list-data',
  saveData: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-inspect-maintain/save-data',
  deleteData: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-inspect-maintain/delete-data',
};

const IntroduceLetterTargetCmtInspectMaintainService = {
  async GetScreenData(params) {
    return axios.get(API_LIST.GetScreenData, { params })
  },
  async GetListData(params) {
    return axios.get(API_LIST.GetListData, { params })
  },
  async saveData(params) {
    return axios.post(API_LIST.saveData, params)
  },
  async deleteData(params) {
    return axios.delete(API_LIST.deleteData, { params })
  }
};

export default IntroduceLetterTargetCmtInspectMaintainService;
