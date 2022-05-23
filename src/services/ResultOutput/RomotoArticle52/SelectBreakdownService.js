import axios from 'configs/axios';

const apiPaths = {
    getDataSelectBreakdown: '/api/romoto-article52/select-breakdown',
    selectRecordSelectBreakdown: '/api/romoto-article52/select-breakdown/select-record',
    selectAllRecordSelectBreakdown: '/api/romoto-article52/select-breakdown/sts-select-all'
};

const SelectBreakdownService = {
    async getDataSelectBreakdownService() {
        return axios.get(apiPaths.getDataSelectBreakdown);
    },
    async selectRecordSelectBreakdownService(params) {
        return axios.post(apiPaths.selectRecordSelectBreakdown, params);
    },
    async selectAllRecordSelectBreakdownService(params) {
        return axios.post(apiPaths.selectAllRecordSelectBreakdown, params);
    },
};

export default SelectBreakdownService;