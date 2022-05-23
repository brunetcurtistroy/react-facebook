import axios from 'configs/axios';

const apiPaths = {
    getDataAffiliationSelectSub: '/api/romoto-article52/affiliation-select-sub',
};

const AffiliationSelectSubService = {
    async getDataAffiliationSelectSubService(params) {
        return axios.get(apiPaths.getDataAffiliationSelectSub, {params});
    },
};

export default AffiliationSelectSubService;