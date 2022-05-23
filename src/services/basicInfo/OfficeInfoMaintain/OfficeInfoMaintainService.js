import axios from "configs/axios";

const pathOffice = {
  getInitialDisplayListAPI:
    "/api/office-info-maintain-directly/office-info-maintain/initial-display",
  createOfficeAPI:
    "/api/office-info-maintain-directly/office-info-maintain/data-register",
  getOfficeAPI:
    "/api/office-info-maintain-directly/office-info-maintain/display-data-generation",
  updateOfficeAPI:
    "/api/office-info-maintain-directly/office-info-maintain/data-update",
  getInitialDisplayCreateListAPI:
    "/api/office-info-maintain-directly/office-info-maintain/initial-display-create",
  getAllOfficeInfoRetrievalQuery:
    "/api/office-info-maintain-directly/office-info-retrieval-query/plant-list",
  getBranchStoreGeneratedAPI:
    "/api/office-info-maintain-directly/branch-store-generated",
  getListBranchShopByOfficeCodeAPI:
    "/api/office-info-maintain-directly/branch-shop-inquiry",
};

const API_LIST = {
  //new API
  getInitialDisplayCorrespondDataDisplayAPI:
    "/api/office-info-maintain-directly/office-info-maintain/initial-display-correspond-data-display",
  getScreenDataAPI:
    "/api/office-info-maintain-directly/office-info-maintain/get-screen-data",
  registerDataAPI:
    "/api/office-info-maintain-directly/office-info-maintain/f12-user",
  dataModifyAPI:
    "/api/office-info-maintain-directly/office-info-maintain/data-modify",
  deleteF11API_1:
    "/api/office-info-maintain-directly/office-info-maintain/delete-f11-1",
  deleteF11API_2:
    "/api/office-info-maintain-directly/office-info-maintain/delete-f11-2",
    updateAddAffiliationInfo:
    "/api/office-info-maintain-directly/office-info-maintain/save-affiliation-info",
    updateAddRecordedInfo:
    "/api/office-info-maintain-directly/office-info-maintain/save-recorded-info",
    UpdateAddResultsTable:
    "/api/office-info-maintain-directly/office-info-maintain/save-results-table",
    getAddAffiliationInfo:
    "/api/office-info-maintain-directly/office-info-maintain/get-affiliation-info",
    getAddRecordedInfo:
    "/api/office-info-maintain-directly/office-info-maintain/get-recorded-info",
    getAddResultsTable:
    "/api/office-info-maintain-directly/office-info-maintain/get-results-table",
    deleteAddAffiliationInfo:
    "/api/office-info-maintain-directly/office-info-maintain/delete-affiliation-info",
    deleteAddRecordedInfo:
    "/api/office-info-maintain-directly/office-info-maintain/delete-recorded-info",
    deleteAddResultsTable:
    "/api/office-info-maintain-directly/office-info-maintain/delete-results-table",
};

const OfficeInfoMaintainService = {
  //New API
  async getInitialDisplayCorrespondDataDisplayService(params) {
    return axios.get(API_LIST.getInitialDisplayCorrespondDataDisplayAPI, {
      params,
    });
  },
  async getScreenDataService() {
    return axios.get(API_LIST.getScreenDataAPI);
  },
  async registerDataService(params) {
    return axios.post(API_LIST.registerDataAPI, params);
  },
  async dataModifyService(params) {
    return axios.post(API_LIST.dataModifyAPI, params);
  },
  async deleteF11API_1_Service(params) {
    return axios.delete(API_LIST.deleteF11API_1, { params });
  },
  async deleteF11API_2_Service(params) {
    return axios.delete(API_LIST.deleteF11API_2, { params });
  },
  //End

  async getInitialDisplayListService() {
    return axios.get(pathOffice.getInitialDisplayListAPI);
  },
  async createOfficeService(office) {
    return axios.post(pathOffice.createOfficeAPI, office);
  },
  async getOfficeService(officeAndBranchCode) {
    console.log("getOfficeService", officeAndBranchCode);
    return axios.get(pathOffice.getOfficeAPI, {
      params: {
        Li_OfficeCode: officeAndBranchCode.Li_OfficeCode,
        Li_BranchStoreCode: officeAndBranchCode.Li_BranchStoreCode,
      },
    });
  },
  async updateOfficeService(office) {
    return axios.put(pathOffice.updateOfficeAPI, office);
  },
  async getInitialDisplayCreateListService() {
    return axios.get(pathOffice.getInitialDisplayCreateListAPI);
  },
  async getAllOfficeInfoRetrievalQueryService(params) {
    return axios.get(pathOffice.getAllOfficeInfoRetrievalQuery, { params });
  },
  async getBranchStoreGeneratedService(officeCode) {
    return axios.get(pathOffice.getBranchStoreGeneratedAPI, {
      params: {
        office_code: officeCode,
      },
    });
  },
  async getListBranchShopByOfficeCodeService(officeCode) {
    return axios.get(pathOffice.getListBranchShopByOfficeCodeAPI, {
      params: {
        office_code: officeCode,
      },
    });
  },
  async updateAddAffiliationInfoService(params) {
    return axios.post(API_LIST.updateAddAffiliationInfo, params);
  },
  async updateAddRecordedInfoService(params) {
    return axios.post(API_LIST.updateAddRecordedInfo, params);
  },
  async updateAddResultsTableService(params) {
    return axios.post(API_LIST.UpdateAddResultsTable, params);
  },
  async getAddAffiliationInfoService() {
    return axios.get(API_LIST.getAddAffiliationInfo);
  },
  async getAddRecordedInfoService(params) {
    return axios.get(API_LIST.getAddRecordedInfo, {params});
  },
  async getAddResultsTableService(params) { 
    return axios.get(API_LIST.getAddResultsTable, {params});
  },
  async deleteAddAffiliationInfoService(params) {
    return axios.delete(API_LIST.deleteAddAffiliationInfo, {params});
  },
  async deleteAddRecordedInfoService(params) {
    return axios.delete(API_LIST.deleteAddRecordedInfo, {params});
  },
  async deleteAddResultsTableService(params) {
    return axios.delete(API_LIST.deleteAddResultsTable, {params});
  },
};

export default OfficeInfoMaintainService;
