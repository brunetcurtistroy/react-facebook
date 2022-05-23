import axios from "configs/axios";

const APP_LIST = {
  screenData:
    "/api/organizations-payment/payment-process-sub/get-screen-data",
  change:
    "/api/organizations-payment/payment-process-sub/pay-date-char-change",
  comfirm:
    "/api/organizations-payment/payment-process-sub/confirm",
};

const PaymentProcessSubService = {
  async screenDataService(params) {
    return axios.get(APP_LIST.screenData, {params});
  },
  async changeService(data) {
    return axios.post(APP_LIST.change, data);
  },
  async comfirmService(data) {
    return axios.post(APP_LIST.comfirm, data);
  },
};

export default PaymentProcessSubService;
