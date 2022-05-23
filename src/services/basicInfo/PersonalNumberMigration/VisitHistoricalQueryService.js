import axios from "configs/axios";

const apiPaths = {
    getVisitHistoricalQuery : '/api/personal-number-migration/visit-history-cal-query',
};

const VisitHistoricalQueryService = {
  async getVisitHistoricalQueryService (params) {
    return axios.get(apiPaths.getVisitHistoricalQuery, {params});
  }
};
export default VisitHistoricalQueryService;
