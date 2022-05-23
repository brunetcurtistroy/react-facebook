import axios from "configs/axios";

const API_LIST = {
  getScreenData:
    "/api/another-inspect-item-setting-category/another-inspect-item-setting-category/get-screen-data",
  getCategorySettings:
    "/api/another-inspect-item-setting-category/another-inspect-item-setting-category/get-screen-data-category-settings",
  getInspectSet:
    "/api/another-inspect-item-setting-category/another-inspect-item-setting-category/get-screen-data-inspect-set",
  DeleteDataCategorySettings:
    "/api/another-inspect-item-setting-category/another-inspect-item-setting-category/delete-data-category-settings",
  DeleteDataInspectSet:
    "/api/another-inspect-item-setting-category/another-inspect-item-setting-category/delete-data-inspect-set",
  saveDataCategorySetting:
    "/api/another-inspect-item-setting-category/another-inspect-item-setting-category/save-data-category-settings",
  saveDataInspectSet:
    "/api/another-inspect-item-setting-category/another-inspect-item-setting-category/save-data-inspect-set",
};

const AnotherInspectItemSettingCategoryService = {
  async getScreenDataService() {
    return axios.get(API_LIST.getScreenData);
  },
  async getCategorySettingsService(params) {
    console.log(params);
    return axios.get(API_LIST.getCategorySettings, { params });
  },
  async getInspectSetService(params) {
    console.log(params);
    return axios.get(API_LIST.getInspectSet, { params });
  },
  async deleteDataCategorySettingsService(params) {
    console.log(params);
    return axios.delete(API_LIST.DeleteDataCategorySettings, { params });
  },
  async deleteDataInspectSetService(params) {
    console.log(params);
    return axios.delete(API_LIST.DeleteDataInspectSet, { params });
  },
  async saveDataCategorySettingService(params) {
    return axios.put(API_LIST.saveDataCategorySetting, params);
  },
  async saveDataInspectSetService(params) {
    return axios.put(API_LIST.saveDataInspectSet, params);
  },
};

export default AnotherInspectItemSettingCategoryService;
