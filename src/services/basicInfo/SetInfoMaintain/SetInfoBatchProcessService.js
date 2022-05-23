import axios from "configs/axios";

const apiPaths = {
    search: "/api/set-info-maintain/set-info-batch-process/display",
    GetNameInspectCode: "/api/set-info-maintain/set-info-batch-process/get-name-inspect-code",
};

const SetInfoBatchProcessService = {
  async searchInfo(params) {
    return axios.get(apiPaths.search, {params});
  },

  async GetNameInspectCode(params) {
    return axios.get(apiPaths.GetNameInspectCode, {params});
  }
};
  
export default SetInfoBatchProcessService;
