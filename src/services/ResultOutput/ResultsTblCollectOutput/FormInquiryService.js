import axios from "configs/axios";

const API_LIST = {
  getListDataAPI:
    "/api/results-tbl-collect-output/result-tbl-batch-create/form-inquiry",
};

const FormInquiryService = {
  async getListDataService() {
    return axios.get(API_LIST.getListDataAPI);
  },
};

export default FormInquiryService;
