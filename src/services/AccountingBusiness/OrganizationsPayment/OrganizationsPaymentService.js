import axios from "configs/axios";

const APP_LIST = {
  displayButton:
    "/api/organizations-payment/organizations-payment/display-button",
  getScreen: "/api/organizations-payment/organizations-payment",
  selectAll: "/api/organizations-payment/organizations-payment/sts-select-all",
  selectOne:
    "/api/organizations-payment/organizations-payment/w1-target-change",
  f10: "/api/organizations-payment/organizations-payment/with-drawal-f10",
  f11: "/api/organizations-payment/organizations-payment/counter-payment-f11",
};

const OrganizationsPaymentService = {
  async DisplayService(data) {
    return axios.post(APP_LIST.displayButton, data);
  },
  async getScreenService() {
    return axios.get(APP_LIST.getScreen);
  },
  async selectAllService(data) {
    return axios.post(APP_LIST.selectAll, data);
  },
  async selectOneService(data) {
    return axios.post(APP_LIST.selectOne, data);
  },
  async f10Service() {
    return axios.post(APP_LIST.f10);
  },
  async f11Service() {
    return axios.post(APP_LIST.f11);
  },
};

export default OrganizationsPaymentService;
