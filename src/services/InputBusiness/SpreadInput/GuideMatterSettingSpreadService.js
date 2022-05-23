import axios from "configs/axios";

const API_LIST = {
  GetListGuideMatterSettingSpread: "/api/spread-input/guide-matter-setting-spread/get-list-data",
  SaveData:"/api/spread-input/guide-matter-setting-spread/save-data",
  DeleteData:"/api/spread-input/guide-matter-setting-spread/delete-data"
};

const GuideMatterSettingSpreadService = {
  async GetListGuideMatterSettingSpreadService(params) {
    return axios.get(API_LIST.GetListGuideMatterSettingSpread, { params });
  },
  async SaveDataService(params) {
    return axios.post(API_LIST.SaveData, params);
  },
  async DeleteDataService(params) {
    return axios.delete(API_LIST.DeleteData, { params });
  },
};

export default GuideMatterSettingSpreadService;