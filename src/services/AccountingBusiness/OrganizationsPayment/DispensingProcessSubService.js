import axios from "configs/axios";

const APP_LIST = {
  screenData:
    "/api/organizations-payment/dispensing-process-sub/get-screen-data",
  change:
    "/api/organizations-payment/dispensing-process-sub/with-drawal-dateChar-change",
  comfirm:
    "/api/organizations-payment/dispensing-process-sub/confirm",
};

const DispensingProcessSubService = {
  async screenDataService() {
    return axios.get(APP_LIST.screenData);
  },
  async changeService(data) {
    return axios.post(APP_LIST.change, data);
  },
  async comfirmService(data) {
    return axios.post(APP_LIST.comfirm, data);
  },
};

export default DispensingProcessSubService;