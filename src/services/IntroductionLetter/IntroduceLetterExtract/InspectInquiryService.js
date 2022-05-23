import axios from "configs/axios";

const API_LIST = {
  getDataAPI: "/api/introduce-letter-extract/inspect-inquiry",
};

const InspectInquiryService = {
  async getDataService(params) {
    return axios.get(API_LIST.getDataAPI, { params });
  },
};

export default InspectInquiryService;
