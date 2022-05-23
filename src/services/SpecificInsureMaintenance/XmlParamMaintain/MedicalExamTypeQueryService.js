import axios from "configs/axios";

const APP_LIST = {
  getScreenData : "/api/xml-param-maintain/medical-exam-type-query",
};

const MedicalExamTypeQueryService = {
  async getScreenDataService(){
    return axios.get(APP_LIST.getScreenData);
  }
}; 
export default MedicalExamTypeQueryService;
