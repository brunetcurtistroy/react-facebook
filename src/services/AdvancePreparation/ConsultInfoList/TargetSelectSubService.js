import axios from "configs/axios";

const API_LIST = {
    getDataTable: "/api/consult-info-list/target-select-sub",
    excelReport: "/api/consult-info-list/target-select-sub/user-action-2", 
    changeLogic: '/api/consult-info-list/target-select-sub/change-logic',
    changeLogicAll: '/api/consult-info-list/target-select-sub/change-logic-all',
};

const TargetSelectSubService = {
    async getDataTable(params) {
        return axios.get(API_LIST.getDataTable, {params});
      },

    async excelReport() {
        return axios.post(API_LIST.excelReport, null, {responseType: 'blob'});
    },

    async changeLogicService(params) {
        return axios.post(API_LIST.changeLogic, params);
    },

    async changeLogicAllService(params) {
        return axios.post(API_LIST.changeLogicAll, params);
    }
};

export default TargetSelectSubService;
