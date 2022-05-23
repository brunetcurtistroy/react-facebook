import axios from "configs/axios";

const apiPaths = {
    getListData : "/api/radiography-finding-input/findings-history-list/get-list-data",
};

const FindingsHistoryListService = {
  async getListDataService() {
    return axios.get(apiPaths.getListData);
  }
};
  
export default FindingsHistoryListService;