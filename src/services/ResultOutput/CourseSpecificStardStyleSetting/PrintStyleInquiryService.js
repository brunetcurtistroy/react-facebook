import axios from "configs/axios";

const API_LIST = {
  GetListPrintStyleInquiryAPI:
    "/api/course-specific-stard-style-setting/print-style-inquiry",
};

const PrintStyleInquiryService = {
  async getListPrintStyleInquiryService() {
    return axios.get(API_LIST.GetListPrintStyleInquiryAPI);
  },
};

export default PrintStyleInquiryService;
