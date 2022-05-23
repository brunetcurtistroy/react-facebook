import axios from "configs/axios";

const API_LIST = {
  GetListData:  "/api/mirais-electronic-medical-records-sent/inspect-maintain/list-data", 
  SaveData:  "/api/mirais-electronic-medical-records-sent/inspect-maintain/save-data", 
  Delete:   "/api/mirais-electronic-medical-records-sent/inspect-maintain/delete-data",  

}; 
const InspectMaintainService = {
  async GetListData() { 
    return axios.get(API_LIST.GetListData);
  },
  async SaveData(params) { 
    return axios.put(API_LIST.SaveData, params );
  },
  async Delete(params) { 
    return axios.delete(API_LIST.Delete, { params });
  },

}
export default InspectMaintainService 
