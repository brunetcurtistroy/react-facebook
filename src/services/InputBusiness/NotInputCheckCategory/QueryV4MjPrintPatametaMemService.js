import axios from "configs/axios";

const APP_LIST = {
    getDataTable: "/api/not-input-check-category/query-v4-mj-print-patameta-mem", 
    saveData: "/api/not-input-check-category/history-setting/save-data",
};

const QueryV4MjPrintPatametaMemService = {
    async getDataTable(params) {
        return axios.get(APP_LIST.getDataTable, { params });
    }, 

    async saveData(params) {
        return axios.post(APP_LIST.saveData, params);
    }
};

export default QueryV4MjPrintPatametaMemService;
