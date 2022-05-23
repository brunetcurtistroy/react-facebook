import axios from 'configs/axios';

const apiPaths = {
    getScreenData: '/api/user-document-item-maintain/user-document-item-maintain/header-capture-output',
    runF10: '/api/user-document-item-maintain/user-document-item-maintain/run-f10',
    runF11: '/api/user-document-item-maintain/user-document-item-maintain/run-f11'
};

const HeaderCaptureOutputService = {
    async getScreenDataService() {
        return axios.get(apiPaths.getScreenData);
    },
    async runF10Service(params) {
        return axios.post(apiPaths.runF10, params);
    },
    async runF11Service(params) {
        return axios.get(apiPaths.runF11, {params});
    },
};

export default HeaderCaptureOutputService;