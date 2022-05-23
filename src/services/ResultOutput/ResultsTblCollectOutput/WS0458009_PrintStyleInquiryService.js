import axios from "configs/axios";

const API_LIST = {
  getListData:
    "/api/results-tbl-collect-output/course-based-determine-by-style-setting/print-style-inquiry",
};

const WS0458009_PrintStyleInquiryService = {
  async getListDataService() {
    return axios.get(API_LIST.getListData);
  },
};

export default WS0458009_PrintStyleInquiryService;
