import axios from "configs/axios";

const API_LIST = {
  getListData:  "/api/mirais-electronic-medical-records-sent/mirais-inspect-maintain/list-data", 
  SaveData:"/api/mirais-electronic-medical-records-sent/mirais-inspect-maintain/save-data",
  Delete:"/api/mirais-electronic-medical-records-sent/mirais-inspect-maintain/delete-data"
};

const MiraisInspectMaintainService = {
  async GetListData() { 
    return axios.get(API_LIST.getListData);
  },
  async SaveData(params) { 
    return axios.put(API_LIST.SaveData,  params );
  },
  async Delete(params) { 
    return axios.delete(API_LIST.Delete,  {params} );
  }
}
export default MiraisInspectMaintainService;
