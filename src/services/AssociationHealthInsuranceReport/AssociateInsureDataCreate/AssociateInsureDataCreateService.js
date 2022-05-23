import axios from "configs/axios";

const API_LIST = {
  getScreenDataAPI: "/api/associate-insure-data-create/associate-insure-data-create/get-screen-data",
  displayAssociateInsureDateCreateAPI: "/api/associate-insure-data-create/associate-insure-data-create/display",
  AssociateInsureDateCreateAPI: "/api/associate-insure-data-create/associate-insure-data-create",
};

const AssociateInsureDataCreateService = {
  async getScreenDataService() {
    return axios.get(API_LIST.getScreenDataAPI);
  },
  async displayAssociateInsureDataCreateService(params) {
    return axios.post(API_LIST.displayAssociateInsureDateCreateAPI, params);
  },
  async getAssociateInsureDataCreateService() {
    return axios.get(API_LIST.AssociateInsureDateCreateAPI);
  },
  async deleteAssociateInsureDataCreateService(params) {
    return axios.post(API_LIST.deleteAssociateInsureDateCreateAPI, params);
  },
  async excelAssociateInsureDataCreateService(params) {
    return axios.post(API_LIST.excelAssociateInsureDateCreateAPI, params, {responseType: 'blob'});
  },
};

export default AssociateInsureDataCreateService;
