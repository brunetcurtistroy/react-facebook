import axios from "configs/axios";

const APP_LIST = {
  addAndUpdateRecord:"/api/e-medical-records-inspect-request-maintain/e-medical-records-inspect-request-maintain/save",
  deleteRecord:"/api/e-medical-records-inspect-request-maintain/e-medical-records-inspect-request-maintain/delete",
  getData:"/api/e-medical-records-inspect-request-maintain/e-medical-records-inspect-request-maintain"
};

const EMedicalRecordsInspectRequestMaintainService = {
  async getDataSearch(params) {
    return axios.get(APP_LIST.getData, {params} );
  },

  async addAndUpdateRecord(params) {
    return axios.post(APP_LIST.addAndUpdateRecord, {data:params});
  },

  async deleteRecord(params) {
    return axios.delete(APP_LIST.deleteRecord, {params});
  }
};

export default EMedicalRecordsInspectRequestMaintainService;
