import axios from "configs/axios";

const API_LIST = {
  GetListAPI: "/api/reserve-status-search/setting-display-item/get-list",
  SaveBtnAPI: "/api/reserve-status-search/setting-display-item/save",
};

const SettingDisplayItemService = {
  async getListService() {
    return axios.get(API_LIST.GetListAPI);
  },
  async SaveBtnService(params) {
    return axios.post(API_LIST.SaveBtnAPI, params);
  },
};

export default SettingDisplayItemService;
