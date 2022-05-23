import axios from 'configs/axios';

const apiPaths = {
    getScreenDataBatchUpdateProcess: '/api/contract-info-batch-process/batch-update-process/get-screen-data',
    getDataSetConfigurationBatchUpdateProcess: '/api/contract-info-batch-process/batch-update-process/set-configuration',
    saveAndUpdateBatchUpdateProcess: '/api/contract-info-batch-process/batch-update-process/save-and-update',
    deleteDataBatchUpdateProcess: '/api/contract-info-batch-process/batch-update-process/delete',
    InputChange: '/api/contract-info-batch-process/batch-update-process/input-change',
    LioTaxClassifyChange: '/api/contract-info-batch-process/batch-update-process/lio-tax-classify-change',
    eventF12: '/api/contract-info-batch-process/batch-update-process/batch-process-f12',
};

const BatchUpdateProcessService = {
    async getScreenDataBatchUpdateService() {
        return axios.get(apiPaths.getScreenDataBatchUpdateProcess);
    },
    async getDataSetConfigurationBatchUpdateProcessService(params) {
        return axios.get(apiPaths.getDataSetConfigurationBatchUpdateProcess, {params});
    },
    async saveAndUpdateBatchUpdateProcessService(params) {
        return axios.post(apiPaths.saveAndUpdateBatchUpdateProcess, params);
    },
    async deleteDataBatchUpdateProcessService(params) {
        return axios.delete(apiPaths.deleteDataBatchUpdateProcess, {params});
    },
    async InputChangeService(params) {
        return axios.post(apiPaths.InputChange, params);
    },
    async LioTaxClassifyChangeService(params) {
        return axios.post(apiPaths.LioTaxClassifyChange, params);
    },
    async eventF12Service(params) {
        return axios.post(apiPaths.eventF12, params);
    },
};

export default BatchUpdateProcessService;