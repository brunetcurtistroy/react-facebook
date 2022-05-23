import axios from "configs/axios";

const API_LIST = {
  filterSearchQueryService:
    "/api/personal-reserve-process/visits-target-search-query",
};

const VisitsTargetSearchQueryService = {
  async filterSearchQueryService(params) {
    return axios.get(API_LIST.filterSearchQueryService, { params });
  },
};

export default VisitsTargetSearchQueryService;
