import axios from "configs/axios";

const apiPaths = {
    runButton : "/api/associate-insure-required-item/associate-insure-required-item/run",
};

const AssociateInsureRequiredItemService = {
  async RunButton (params) {
    return axios.post(apiPaths.runButton, params);
  }
};
  
export default AssociateInsureRequiredItemService;
