import axios from "configs/axios";

const API_LIST = {
  Check_F12:  "/api/mirais-electronic-medical-records-sent/confirm-screen/check-f12", 
  ListData:  "/api/mirais-electronic-medical-records-sent/confirm-screen/sub", 
  ListInspect:  "/api/mirais-electronic-medical-records-sent/confirm-screen/inspect",  

}; 
const ConfirmScreenService = {
  async Check_F12() { 
    return axios.get(API_LIST.Check_F12);
  },
  async ListData(params) { 
    return axios.get(API_LIST.ListData, { params });
  },
  async ListInspect(params) { 
    return axios.get(API_LIST.ListInspect, { params });
  },

}
export default ConfirmScreenService;
