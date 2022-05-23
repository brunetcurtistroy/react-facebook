import axios from "configs/axios";

const API_LIST = {
  GetListData: '/api/introduce-letter-master-maintain/medical-institutions-master',
  saveData: '/api/introduce-letter-master-maintain/medical-institutions-master/save-data',
  deleteData: '/api/introduce-letter-master-maintain/medical-institutions-master/delete-data',
};

const MedicalInstitutionsMasterService = {
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

export default MedicalInstitutionsMasterService;
