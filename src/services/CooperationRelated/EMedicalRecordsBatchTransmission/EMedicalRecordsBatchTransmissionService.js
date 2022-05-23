import axios from "configs/axios";

const apiPaths = {
    getScreenData : "/api/e-medical-records-batch-transmission/e-medical-records-transmission/get-screen-data",
    searchBtn: '/api/e-medical-records-batch-transmission/e-medical-records-transmission/display-btn',
    getDataBySearch : "/api/e-medical-records-batch-transmission/e-medical-records-transmission/extract-list",
    batchTransmiss : "/api/e-medical-records-batch-transmission/e-medical-records-transmission/batch-transmiss-btn",
    allSelect : "/api/e-medical-records-batch-transmission/e-medical-records-transmission/all-select",
    selectRecord : "/api/e-medical-records-batch-transmission/e-medical-records-transmission/select-one"
};

const EMedicalRecordsBatchTransmissionService = {
  async getScreenData () {
    return axios.get(apiPaths.getScreenData);
  },

  async searchBtn (params) {
    return axios.get(apiPaths.searchBtn, {params});
  },

  async getDataBySearch () {
    return axios.get(apiPaths.getDataBySearch);
  },

  async batchTransmiss (params) {
    return axios.get(apiPaths.batchTransmiss, {params});
  },

  async allSelect (params) {
    return axios.post(apiPaths.allSelect, params);
  },

  async selectRecord (params) {
    return axios.post(apiPaths.selectRecord, params);
  }
};
  
export default EMedicalRecordsBatchTransmissionService;