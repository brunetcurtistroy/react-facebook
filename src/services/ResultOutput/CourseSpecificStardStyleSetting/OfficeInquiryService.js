import axios from "configs/axios";

const API_LIST = {
  GetListOfficeInquiryAPI:
    "/api/course-specific-stard-style-setting/office-inquiry",
};

const OfficeInquiryService = {
  async getListOfficeInquiryService() {
    return axios.get(API_LIST.GetListOfficeInquiryAPI);
  },
};

export default OfficeInquiryService;
