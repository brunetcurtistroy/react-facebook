import axios from "configs/axios";

const apiPaths = {
    getListData : "/api/radiography-finding-input/judge-select-query-sub/get-screen-data",
};

const JudgeSelectQuerySubService = {
  async getListDataService(params) {
    return axios.get(apiPaths.getListData, {params});
  }
};
  
export default JudgeSelectQuerySubService;