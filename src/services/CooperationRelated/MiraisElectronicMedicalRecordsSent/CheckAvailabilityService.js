import axios from "configs/axios";

const API_LIST = {
  getListData:  "/api/mirais-electronic-medical-records-sent/check-availability/list-data", 
  BreakDown:  "/api/mirais-electronic-medical-records-sent/check-availability/break-down/list-data", 
  Recount_F12:  "/api/mirais-electronic-medical-records-sent/check-availability/recount-f12",  

}; 
const CheckAvailabilityService = {
  async getListData(params) { 
    return axios.get(API_LIST.getListData, { params });
  },
  async BreakDown(params) { 
    return axios.get(API_LIST.BreakDown, { params });
  },
  async Recount_F12(params) { 
    return axios.post(API_LIST.Recount_F12, params );
  },

}
export default CheckAvailabilityService;
