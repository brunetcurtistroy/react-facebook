import axios from "configs/axios";
const API_LIST = {
  getInit: "/api/billing-integration/billing-integration/get-screen-init",
  getDataDisplay: "/api/billing-integration/billing-integration/get-screen-display",
  getDataDisplayAfter: "/api/billing-integration/billing-integration/get-screen-display-after",
  Expression_141: "/api/billing-integration/billing-integration/expression_141",
  getDataTableSub: "/api/billing-integration/billing-integration/sub-integrate-breadown",
};

const BillingIntegrationService = {
  async getInit() {
    return axios.get(API_LIST.getInit);
  },

  async getDataDisplay(params) {
    return axios.get(API_LIST.getDataDisplay, { params });
  },

  async getDataDisplayAfter(params) {
    return axios.get(API_LIST.getDataDisplayAfter, { params });
  },

  async Expression_141() {
    return axios.get(API_LIST.Expression_141);
  },

  async getDataTableSub(params) {
    return axios.get(API_LIST.getDataTableSub, { params });
  }
};
export default BillingIntegrationService;
