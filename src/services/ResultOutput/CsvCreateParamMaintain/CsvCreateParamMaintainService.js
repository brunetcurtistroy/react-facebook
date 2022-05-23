import axios from "configs/axios";

const APP_LIST = {
    getListData: "/api/csv-create-param-maintain/csv-create-param-maintain",
    advanceSetitng: "/api/csv-create-param-maintain/csv-create-param-maintain/advanced-setting",
    deteteData: "/api/csv-create-param-maintain/csv-create-param-maintain/delete-data",
    saveData: "/api/csv-create-param-maintain/csv-create-param-maintain/save-data",
    f12: "/api/csv-create-param-maintain/csv-create-param-maintain/f12",
    gzoomCource: "/api/csv-create-param-maintain/csv-create-param-maintain/gzoom-course",
    getNameCondition: "/api/csv-create-param-maintain/csv-create-param-maintain/gzoom-condition-num",
};

const CsvCreateParamMaintainService = {
    async getListData() {
        return axios.get(APP_LIST.getListData);
    },

    async advanceSetitng(params) {
        return axios.get(APP_LIST.advanceSetitng, { params });
    },

    async deleteData(params) {
        return axios.delete(APP_LIST.deteteData, { params });
    },

    async saveData(params) {
        return axios.post(APP_LIST.saveData, params);
    },

    async f12(params) {
        return axios.get(APP_LIST.f12, { params });
    },

    async gzoomCource(params) {
        return axios.get(APP_LIST.gzoomCource, { params });
    },

    async getNameCondition(params) {
        return axios.get(APP_LIST.getNameCondition, { params });
    }
};

export default CsvCreateParamMaintainService;
