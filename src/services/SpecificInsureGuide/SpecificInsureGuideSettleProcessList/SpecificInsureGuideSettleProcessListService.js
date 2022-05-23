import axios from "configs/axios";

const apiPaths = {
    dataEventExec: "/api/specific-insure-guide-settle-process-list/exec", 
};

const SpecificInsureGuideSettleProcessListService = {
  async dataEventExecService(params) {
    return axios.post(apiPaths.dataEventExec, params );
  }, 
};

export default SpecificInsureGuideSettleProcessListService;