import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/associate-insure-money-amount-setting/format-inquiry",
};

const FormatInquirySevice = {
  async getScreenData() {
    return axios.get(apiPaths.getScreenData);
  }
};
  
export default FormatInquirySevice;
