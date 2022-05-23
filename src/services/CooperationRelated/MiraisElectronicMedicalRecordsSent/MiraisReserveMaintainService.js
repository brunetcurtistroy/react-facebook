import axios from "configs/axios";

const API_LIST = {
  GetListData:  "/api/mirais-electronic-medical-records-sent/mirais-reserve-maintain/list-data", 
  SaveData:  "/api/mirais-electronic-medical-records-sent/mirais-reserve-maintain/save-data", 
  Delete:   "/api/mirais-electronic-medical-records-sent/mirais-reserve-maintain/delete-data", 
  ListDataNum:   "/api/mirais-electronic-medical-records-sent/mirais-reserve-maintain/num-frame/list-data",  
  SaveDataNum:   "/api/mirais-electronic-medical-records-sent/mirais-reserve-maintain/num-frame/save-data",  
  DeleteNum:   "/api/mirais-electronic-medical-records-sent/mirais-reserve-maintain/num-frame/delete-data",   
}; 
const MiraisReserveMaintainService = {
  async GetListData() { 
    return axios.get(API_LIST.GetListData);
  },
  async SaveData(params) { 
    return axios.put(API_LIST.SaveData, params );
  },
  async Delete(params) { 
    return axios.delete(API_LIST.Delete, { params });
  },
  async ListDataNum(params) { 
    return axios.get(API_LIST.ListDataNum, {params});
  },
  async SaveDataNum(params) { 
    return axios.put(API_LIST.SaveDataNum, params );
  },
  async DeleteNum(params) { 
    return axios.delete(API_LIST.DeleteNum, { params });
  },

}
export default MiraisReserveMaintainService 