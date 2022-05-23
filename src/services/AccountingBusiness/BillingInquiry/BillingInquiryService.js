import axios from "configs/axios";

const apiPaths = {
  getScreenData:"/api/billing-inquiry/billing-inquiry/get-screen-data",
  onSearch:"/api/billing-inquiry/billing-inquiry/retrieval"
};

const BillingInquiryService = {
  async getScreenData (params) {
    return axios.get(apiPaths.getScreenData, { params });
  },

  async getDataOnSearch (params) {
    return axios.get(apiPaths.onSearch, { params });
  }
};

export default BillingInquiryService;
