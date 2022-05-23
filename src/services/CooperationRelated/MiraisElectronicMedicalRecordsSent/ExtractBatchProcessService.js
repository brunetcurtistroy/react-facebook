import axios from "configs/axios";

const API_LIST = {
  getListData:  "/api/mirais-electronic-medical-records-sent/extract-batch-process", 
  F11:  "/api/mirais-electronic-medical-records-sent/extract-batch-process/delete-all-f11", 
  F03:  "/api/mirais-electronic-medical-records-sent/extract-batch-process/delete-f03", 
  F12:  "/api/mirais-electronic-medical-records-sent/extract-batch-process/batch-extract-f12", 

};

const ExtractBatchProcessService = {
  async getListData(params) { 
    return axios.get(API_LIST.getListData, { params });
  },
  async F11(params) { 
    return axios.delete(API_LIST.F11, { params });
  },
  async F03(params) { 
    return axios.delete(API_LIST.F03, { params });
  },
  async F12(params) { 
    return axios.get(API_LIST.F12, { params });
  },

}
export default ExtractBatchProcessService;
