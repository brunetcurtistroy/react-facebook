import axios from "configs/axios";

const apiPaths = {
  getScreenData: "/api/deposit-withdrawal-inquiry/invoice-maintain/get-screen-data",
  getInitData: "/api/deposit-withdrawal-inquiry/invoice-maintain/screen-init",
  getDisplayData: "/api/deposit-withdrawal-inquiry/invoice-maintain/screen-display",
  getSubContent: "/api/deposit-withdrawal-inquiry/invoice-maintain/sub-content",
  eventGzoomDestination: "/api/deposit-withdrawal-inquiry/invoice-maintain/gzoom-destination",
  eventF7: "/api/deposit-withdrawal-inquiry/invoice-maintain/f7",
  eventF11: "/api/deposit-withdrawal-inquiry/invoice-maintain/f11",
  eventF12: "/api/deposit-withdrawal-inquiry/invoice-maintain/f12",
  eventChangeTaxCalculateUnit: "/api/deposit-withdrawal-inquiry/invoice-maintain/change-tax-calculate-unit",
  eventChangeTaxClassify: "/api/deposit-withdrawal-inquiry/invoice-maintain/change-tax-classify",
  eventChangeLessThanTaxCircle: "/api/deposit-withdrawal-inquiry/invoice-maintain/change-less-than-tax-circle",
  saveDataSubContent: "/api/deposit-withdrawal-inquiry/invoice-maintain/save-subcontent",
};

const InvoiceMaintainService = {
  async getScreenData(params) {
    return axios.get(apiPaths.getScreenData, { params });
  },

  async getInitData(params) {
    return axios.get(apiPaths.getInitData, { params });
  },

  async getDisplayData(params) {
    return axios.get(apiPaths.getDisplayData, { params });
  },

  async getSubContent(params) {
    return axios.get(apiPaths.getSubContent, { params });
  },

  async eventGzoomDestination(params) {
    return axios.get(apiPaths.eventGzoomDestination, { params });
  },

  async eventF7(params) {
    return axios.get(apiPaths.eventF7, { params });
  },

  async eventF11(params) {
    return axios.post(apiPaths.eventF11, params );
  },

  async eventF12(params) {
    return axios.post(apiPaths.eventF12, params );
  },

  async eventChangeTaxCalculateUnit(params) {
    return axios.get(apiPaths.eventChangeTaxCalculateUnit, { params });
  },

  async eventChangeTaxClassify(params) {
    return axios.get(apiPaths.eventChangeTaxClassify, { params });
  },

  async eventChangeLessThanTaxCircle(params) {
    return axios.post(apiPaths.eventChangeLessThanTaxCircle, params);
  },

  async saveDataSubContent(params) {
    return axios.post(apiPaths.saveDataSubContent, params);
  },
};

export default InvoiceMaintainService;
