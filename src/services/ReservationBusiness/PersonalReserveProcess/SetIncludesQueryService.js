import axios from "configs/axios";

const apiPaths = {
    getSetIncludesQuery: "/api/personal-reserve-process/set-includes-query",
};

const SetIncludesQueryService = {
    async getSetIncludesQuery(params) {
        return axios.get(apiPaths.getSetIncludesQuery, { params });
    },
};
  
export default SetIncludesQueryService;
