import axios from "configs/axios";

const API_LIST = {
  errorConfirm:  "/api/mirais-electronic-medical-records-sent/error-confirm-sub", 
};

const ErrorConfirmSubService = {
  async errorConfirm(params) { 
    return axios.get(API_LIST.errorConfirm, { params });
  } 
}
export default ErrorConfirmSubService;