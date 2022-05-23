import axios from "configs/axios";

const API_LIST = {
  GetListGuidMatterSet: "/api/spread-input/guide-matter-set/get-list-data",
  SaveData:"/api/spread-input/guide-matter-set/save-data",
  DeleteData:"/api/spread-input/guide-matter-set/delete-data"
};

const GuideMatterSetService = {
  async GetListGuidMatterSetService(params) {
    return axios.get(API_LIST.GetListGuidMatterSet, { params });
  },
  async SaveDataService(params) {
    return axios.post(API_LIST.SaveData, params);
  },
  async DeleteDataService(params) {
    return axios.delete(API_LIST.DeleteData, { params });
  },
};

export default GuideMatterSetService;