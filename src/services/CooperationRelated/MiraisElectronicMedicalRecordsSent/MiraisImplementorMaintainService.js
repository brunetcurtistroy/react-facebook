import axios from "configs/axios";

const API_LIST = {
  GetListData:  "/api/mirais-electronic-medical-records-sent/mirais-implementor-maintain/list-data", 
  SaveData:  "/api/mirais-electronic-medical-records-sent/mirais-implementor-maintain/save-data",  

}; 
const MiraisImplementorMaintainService = {
  async GetListData() { 
    return axios.get(API_LIST.GetListData);
  },
  async SaveData(params) { 
    return axios.put(API_LIST.SaveData, params );
  }, 

}
export default MiraisImplementorMaintainService 
