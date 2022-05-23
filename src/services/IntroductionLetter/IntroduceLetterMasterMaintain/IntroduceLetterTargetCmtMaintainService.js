import axios from "configs/axios";

const API_LIST = {
  deleteDataInspect: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-maintain/inspect-maintain/delete-data',
  deleteMaintain: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-maintain/delete-data',
  getMaintain: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-maintain',
  getInspectMaintain: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-maintain/inspect-maintain',
  saveDataInspect: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-maintain/inspect-maintain/save-data',
  saveMaintain: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-maintain/save-data',
  userAction1: '/api/introduce-letter-master-maintain/introduce-letter-target-cmt-maintain/user-action-1'
};

const IntroduceLetterTargetCmtMaintainService = {
  async getMaintain(params) {
    return axios.get(API_LIST.getMaintain, {params})
  },
  async getInspectMaintain(params) {
    return axios.get(API_LIST.getInspectMaintain, {params})
  },
  async saveMaintain(params) {
    return axios.post(API_LIST.saveMaintain, params)
  },
  async saveDataInspect(params) {
    return axios.post(API_LIST.saveDataInspect, params)
  },
  async deleteDataInspect(params) {
    return axios.delete(API_LIST.deleteDataInspect, { params})
  },
  async deleteMaintain(params) {
    return axios.delete(API_LIST.deleteMaintain, { params})
  },
  async userAction1(params) {
    return axios.delete(API_LIST.userAction1, { params})
  }



};

export default IntroduceLetterTargetCmtMaintainService