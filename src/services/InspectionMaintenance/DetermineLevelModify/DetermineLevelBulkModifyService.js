import axios from 'configs/axios';

const apiPaths = {
    getDataDetermineLevelBulkModify: '/api/determine-level-modify/determine-level-modify-master-coercive/determine-level-bulk-modify/get-screen-data',
    saveDetermineLevelBulkModify: '/api/determine-level-modify/determine-level-modify-master-coercive/determine-level-bulk-modify/save-data',
    deleteDataDetermineLevelBulkModify: '/api/determine-level-modify/determine-level-modify-master-coercive/determine-level-bulk-modify/delete-data'
};

const DetermineLevelBulkModifyService = {
    async getDataDetermineLevelBulkModifyService() {
        return axios.get(apiPaths.getDataDetermineLevelBulkModify);
    },
    async saveDataDetermineLevelBulkModifyService(params) {
        return axios.put(apiPaths.saveDetermineLevelBulkModify, params);
    },
    async deleteDataDetermineLevelBulkModifyService(params) {
        return axios.delete(apiPaths.deleteDataDetermineLevelBulkModify, {params});
    },
};

export default DetermineLevelBulkModifyService;