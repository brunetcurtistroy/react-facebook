import axios from 'configs/axios';

const apiPaths = {
    getScreenConditionExpressSet: '/api/binding-mode-setting/condition-express-set/get-screen-data',
    outputConditionExpressSet: '/api/binding-mode-setting/condition-express-set/output'
};

const ConditionExpressSetService = {
    async getScreenConditionExpressSetService(params) {
        return axios.get(apiPaths.getScreenConditionExpressSet, {params});
    },
    async outputConditionExpressSetService(params) {
        return axios.get(apiPaths.outputConditionExpressSet, {params});
    },
};

export default ConditionExpressSetService;