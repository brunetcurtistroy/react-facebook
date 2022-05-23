import axios from "configs/axios";

const API_LIST = {
  getScreenData:
    "/api/binding-mode-setting/binding-mode-setting/get-screen-data",
  getDataBindingModeSetting: "/api/binding-mode-setting/binding-mode-setting",
  saveAndUpdateBindingModeSetting:
    "/api/binding-mode-setting/binding-mode-setting/save-and-update",
  getDataModeUseBindingModeSetting:
    "/api/binding-mode-setting/binding-mode-setting/mode-use",
  deleteModeUseBindingModeSetting:
    "/api/binding-mode-setting/binding-mode-setting/delete-mode-use",
  deleteBindingModeSetting:
    "/api/binding-mode-setting/binding-mode-setting/delete",
  changeConditionalExpression:
    "/api/binding-mode-setting/binding-mode-setting/get-name-conditional-expression",
};

const BindingModeSettingService = {
  async getScreenDataService() {
    return axios.get(API_LIST.getScreenData);
  },
  async getDataBindingModeSettingService() {
    return axios.get(API_LIST.getDataBindingModeSetting);
  },
  async saveAndUpdateBindingModeSettingService(params) {
    return axios.post(API_LIST.saveAndUpdateBindingModeSetting, params);
  },
  async getDataModeUseBindingModeSettingService(params) {
    return axios.get(API_LIST.getDataModeUseBindingModeSetting, { params });
  },
  async deleteModeUseBindingModeSettingService(params) {
    return axios.delete(API_LIST.deleteModeUseBindingModeSetting, { params });
  },
  async deleteBindingModeSettingService(params) {
    return axios.delete(API_LIST.deleteBindingModeSetting, { params });
  },
  async changeConditionalExpressionService(params) {
    return axios.get(API_LIST.changeConditionalExpression, { params });
  },
};

export default BindingModeSettingService;
