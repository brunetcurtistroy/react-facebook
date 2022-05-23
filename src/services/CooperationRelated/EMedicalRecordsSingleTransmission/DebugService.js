import axios from "configs/axios";

const API_LIST = { 
    GetListData:  "/api/e-medical-records-single-transmission/debug/list-data", 
    Save :  "/api/e-medical-records-single-transmission/debug/save-data", 
    Delete:  "/api/e-medical-records-single-transmission/debug/delete-data",
};

const DebugService = {
  async GetListData(params) { 
    return axios.get(API_LIST.GetListData, { params });
  },
  async Save(params) { 
    return axios.post(API_LIST.Save, params );
  }, 
  async Delete(params) { 
    return axios.delete(API_LIST.Delete, { params });
  },
}; 
export default DebugService;