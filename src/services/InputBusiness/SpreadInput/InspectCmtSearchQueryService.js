import axios from "configs/axios";

const API_LIST = {
  GetListDataAPI: "/api/spread-input/inspect-cmt-search-query/get-list-data",
};

const InspectCmtSearchQueryService = {
  async GetListDataService(params) {
    return axios.get(API_LIST.GetListDataAPI, { params });
  },
};

export default InspectCmtSearchQueryService;
