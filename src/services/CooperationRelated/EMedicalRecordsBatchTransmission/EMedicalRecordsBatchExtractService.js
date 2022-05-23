import axios from "configs/axios";

const apiPaths = {
    getScreenData : "/api/e-medical-records-batch-transmission/medical-records-batch-extract/get-screen-data",
    extract : "/api/e-medical-records-batch-transmission/medical-records-batch-extract/extract",
    release : "/api/e-medical-records-batch-transmission/medical-records-batch-extract/release"
};

const EMedicalRecordsBatchExtractService = {
  async getScreenData () {
    return axios.get(apiPaths.getScreenData);
  },

  async extract (params) {
    return axios.post(apiPaths.extract, params);
  },

  async release (params) {
    return axios.delete(apiPaths.release, {params});
  }
};
  
export default EMedicalRecordsBatchExtractService;