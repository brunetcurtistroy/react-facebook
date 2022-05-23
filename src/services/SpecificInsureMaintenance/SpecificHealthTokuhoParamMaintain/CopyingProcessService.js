import axios from 'configs/axios';

const apiPaths = {
    registerEventMetabolicSyndromeHierarchical: '/api/specific-health-tokuho-param-maintain/copying-process/register',
};

const CopyingProcessService = {
    async registerEventMetabolicSyndromeHierarchicalService(params) {
        return axios.post(apiPaths.registerEventMetabolicSyndromeHierarchical, params);
    },
};

export default CopyingProcessService;