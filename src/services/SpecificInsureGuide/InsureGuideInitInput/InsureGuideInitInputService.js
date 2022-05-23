import axios from "configs/axios";

const API_LIST = {
  insureGuideInitInput: "/api/insure-guide-init-input/insure-guide-init-input",
};

const InsureGuideInitInputService = {
  async getInsureGuideInitInputService(params) {
    console.log(params);
    return axios.get(API_LIST.insureGuideInitInput, { params });
  },
};

export default InsureGuideInitInputService;
