import axios from "configs/axios";

const API_LIST = {
    GetListData:  "/api/e-medical-records-single-transmission/consult-select", 
}; 
const ConsultSelectService = {
  async GetListData(params) { 
    return axios.get(API_LIST.GetListData, { params });
  } 
}; 
export default ConsultSelectService;