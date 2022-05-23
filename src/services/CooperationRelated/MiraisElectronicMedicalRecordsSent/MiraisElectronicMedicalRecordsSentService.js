import axios from "configs/axios";

const API_LIST = {
  getListData:  "/api/mirais-electronic-medical-records-sent/mirais-electronic-medical-records-sent/", 
  F12:"/api/mirais-electronic-medical-records-sent/mirais-electronic-medical-records-sent/submit-btn" ,
  SubmitBtnBefore :"/api/mirais-electronic-medical-records-sent/mirais-electronic-medical-records-sent/submit-btn-before"
};

const MiraisElectronicMedicalRecordsSentService = {
  async GetListData(params) { 
    return axios.get(API_LIST.getListData, { params });
  }, 
  async SubmitBtnBefore(params) { 
    return axios.get(API_LIST.SubmitBtnBefore, { params });
  } ,
  async F12(params) { 
    return axios.get(API_LIST.F12, { params });
  } 
}
export default MiraisElectronicMedicalRecordsSentService;