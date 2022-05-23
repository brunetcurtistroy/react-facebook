import axios from 'configs/axios';

const apiPaths = {
    getScreenIntegrationReleased: '/api/invoice/integration-released/get-screen-data',
    getDataIntegrationReleased: '/api/invoice/integration-released',
    execIntegrationReleased: '/api/invoice/integration-released/exec'
};

const IntegrationReleasedService = {
    async getScreenIntegrationReleasedService() {
        return axios.get(apiPaths.getScreenIntegrationReleased);
    },
    async getDataIntegrationReleasedService(params) {
        return axios.get(apiPaths.getDataIntegrationReleased, { params });
    },
    async execIntegrationReleasedService() {
        return axios.get(apiPaths.execIntegrationReleased);
    },
};

export default IntegrationReleasedService;