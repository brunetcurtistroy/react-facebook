import axios from "configs/axios";

const API_LIST = {
    Transmiss:  "/api/e-medical-records-single-transmission/sending-confirm", 
};

const SendingConfirmService = {
  async Transmiss(params) { 
    return axios.get(API_LIST.Transmiss, { params });
  } 
}; 
export default SendingConfirmService;