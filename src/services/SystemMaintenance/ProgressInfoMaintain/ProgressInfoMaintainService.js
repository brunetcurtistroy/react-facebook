import axios from 'configs/axios';

const apiPaths = {
    getScreenDataProgressInfoMaintain: '/api/progress-info-maintain/progress-info-maintain/get-data',
    getProgressListData: '/api/progress-info-maintain/progress-info-maintain/get-info-child',
    addUpdateNodeData: '/api/progress-info-maintain/progress-info-maintain/save-node',
    deleteNodeData: '/api/progress-info-maintain/progress-info-maintain/delete-node',
};

const ProgressInfoMaintainService = {
    async getScreenDataProgressInfoMaintainService() {
        return axios.get(apiPaths.getScreenDataProgressInfoMaintain);
    },
    async getProgressListDataService(params) {
        return axios.get(apiPaths.getProgressListData, {params});
    },
    async addUpdateNodeDataService(params) {
        return axios.post(apiPaths.addUpdateNodeData, params);
    },
    async deleteNodeDataService(params) {
        return axios.delete(apiPaths.deleteNodeData, {params});
    },
};

export default ProgressInfoMaintainService;