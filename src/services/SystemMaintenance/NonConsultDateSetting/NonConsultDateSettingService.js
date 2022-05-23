import axios from 'configs/axios';

const apiPaths = {
    batchSettingProcessDateNoCorre: '/api/non-consult-date-setting/collect-setting/batch-setting-process-date-no-corre',
    getDataVariousAggregate: '/api/non-consult-date-setting/single-setting/various-aggregate',
    tableRewrite: '/api/non-consult-date-setting/single-setting/table-rewrite'
};

const NonConsultDateSettingService = {
    // WS1494003_CollectSetting
    async batchSettingProcessDateNoCorreService(params){
        return axios.post(apiPaths.batchSettingProcessDateNoCorre, params)
    },
    // WS1494006_SingleSetting
    async getDataVariousAggregateService(params) {
        return axios.get(apiPaths.getDataVariousAggregate, {params});
    },
    async tableRewriteService(params){
        return axios.post(apiPaths.tableRewrite, params)
    },
};

export default NonConsultDateSettingService;