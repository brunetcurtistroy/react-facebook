import axios from "configs/axios";

const API_LIST = {
  GetLisstNotesSet: "/api/spread-input/notes-set/get-list-data",
  SaveData:"/api/spread-input/notes-set/save-data",
  DeleteData:"/api/spread-input/notes-set/delete-data"
};

const NotesSetService = {
  async GetLisstNotesSetService(params) {
    return axios.get(API_LIST.GetLisstNotesSet, { params });
  },
  async SaveDataService(params) {
    return axios.post(API_LIST.SaveData, params);
  },
  async DeleteDataService(params) {
    return axios.delete(API_LIST.DeleteData, { params });
  },
};

export default NotesSetService;