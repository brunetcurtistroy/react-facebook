import axios from "configs/axios";

const API_LIST = {
  getIndex: "/api/personal-reserve-process/personal-office-search-query",
};

const PersonalOfficeSearchQueryService = {
  async getIndexService(params) {
    return axios.get(API_LIST.getIndex , {params});
  },
};

export default PersonalOfficeSearchQueryService;
