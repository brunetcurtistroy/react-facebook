import axios from "configs/axios";

const API_LIST = {
  getDisplayConsultHistory: '/api/introduce-letter-extract/display-consult-history',
};

const DisplayConsultHistoryService = {
  async onGetDisplayConsultHistory(params) {
    console.log(params);
    return axios.get(API_LIST.getDisplayConsultHistory, { params });
  },

};

export default DisplayConsultHistoryService;
