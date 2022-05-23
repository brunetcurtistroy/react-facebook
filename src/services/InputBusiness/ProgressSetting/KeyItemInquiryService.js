import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/progress-setting/key-item-inquiry/get-data",
};

const KeyItemInquiryService = {
  async getScreenDataService() {
    return axios.get(apiPaths.getScreenData);
  }
};
  
export default KeyItemInquiryService;