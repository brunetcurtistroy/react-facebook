import axios from "configs/axios";

const apiPaths = {
    transmiss : "/api/e-medical-records-batch-transmission/sending-confirm/tranmiss"
};

const SendingConfirmService = {
  async onTransmiss (params) {
    return axios.get(apiPaths.transmiss, {params});
  } 
};
  
export default SendingConfirmService;