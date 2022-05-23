import axios from "configs/axios";

const APP_LIST = {
  getScreenData : "/api/xml-param-maintain/medical-exam-type-maintain",
  createAndUpdate: "/api/xml-param-maintain/medical-exam-type-maintain/save-and-update",
  deleteData: "/api/xml-param-maintain/medical-exam-type-maintain/delete"
};

const MedicalExamTypeMaintainService = {
  async getScreenDataService(){
    return axios.get(APP_LIST.getScreenData);
  },

  async createAndUpdateDataService(params) {
    return axios.post(APP_LIST.createAndUpdate, params);
},

async deleteDataService(params) {
    return axios.delete(APP_LIST.deleteData, { params });
}
}; 
export default MedicalExamTypeMaintainService;
