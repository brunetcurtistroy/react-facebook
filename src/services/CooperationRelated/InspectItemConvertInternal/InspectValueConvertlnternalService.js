import axios from "configs/axios";
import { getProgressListDataAction } from "redux/SystemMaintenance/ProgressInfoMaintain/ProgressInfoMaintainService.actions";

const API_LIST = {
    ListData: "/api/inspect-item-convert-internal/inspect-value-convert-internal/get-list-data",
    PostData: "/api/inspect-item-convert-internal/copy",
    SaveData: "/api/inspect-item-convert-internal/inspect-value-convert-internal/save-data",
    DeleteData: "/api/inspect-item-convert-internal/inspect-value-convert-internal/delete-data"
};

const InspectValueConvertlnternalService = {
    async getListDataService() {
        return axios.get(API_LIST.ListData);
      },
      async postDataService(data){
        return axios.post(API_LIST.PostData, data);
      },
      async saveDataService(data){
        return axios.post(API_LIST.SaveData, data);
      },
      async deleteDataService(data){
        return axios.delete(API_LIST.DeleteData,{data});
      }
};
export default InspectValueConvertlnternalService;
