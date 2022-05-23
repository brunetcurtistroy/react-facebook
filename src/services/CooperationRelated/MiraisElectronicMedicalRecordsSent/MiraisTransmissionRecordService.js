import axios from "configs/axios";

const API_LIST = {
  getListData:  "/api/mirais-electronic-medical-records-sent/mirais-transmission-record/list-data", 
};

const MiraisTransmissionRecordService = {
  async getListData(params) { 
    return axios.get(API_LIST.getListData, { params });
  } 
}
export default MiraisTransmissionRecordService;
