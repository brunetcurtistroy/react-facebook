import axios from "configs/axios";

const API_LIST = {
  getListData:  "/api/mirais-electronic-medical-records-sent/laboratory-inspect-confirm-sub", 
};

const LaboratoryInspectConfirmSubService = {
  async getListData(params) { 
    return axios.get(API_LIST.getListData, { params });
  } 
}
export default LaboratoryInspectConfirmSubService;
