import axios from "configs/axios";

const API_LIST = {
  getListDataAPI:
    "/api/binding-mode-setting/condition-express-info-inquiry/get-list-data",
};

const ConditionExpressInfoInquiryService = {
  async getListDataService() {
    return axios.get(API_LIST.getListDataAPI);
  },
};

export default ConditionExpressInfoInquiryService;
