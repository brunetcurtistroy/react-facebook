import axios from "configs/axios";

const API_LIST = {
  GetScreenDataAPI:
    "/api/reserve-status-search/reserves-persons-bulk-update/get-screen-data",
  SearchExecAPI:
    "/api/reserve-status-search/reserves-persons-bulk-update/search-exec",
};

const ReservesPersonsBulkUpdateService = {
  async getScreenDataService() {
    return axios.get(API_LIST.GetScreenDataAPI);
  },
  async SearchExecService(params) {
    return axios.put(API_LIST.SearchExecAPI, params);
  },
};

export default ReservesPersonsBulkUpdateService;
