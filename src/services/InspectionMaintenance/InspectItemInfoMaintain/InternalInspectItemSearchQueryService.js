import axios from 'configs/axios';

const apiPaths = {
    getInternalInspectItemSearchQuery: '/api/inspect-item-info-maintain/internal-inspect-item-search-query',
};


const InternalInspectItemSearchQueryServiceService = {
  async getInternalInspectItemSearchQueryService (params) {
      return axios.get(apiPaths.getInternalInspectItemSearchQuery, {params});
  },
};

export default InternalInspectItemSearchQueryServiceService;