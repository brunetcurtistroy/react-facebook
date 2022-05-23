import axios from "configs/axios";

const APP_LIST = {
    // 0460008
    getScreenData: "/api/csv-create-param-maintain/convert-tbl-sub-inspect/",
    saveData: "/api/csv-create-param-maintain/convert-tbl-sub-inspect/save-data",
    deleteData: "/api/csv-create-param-maintain/convert-tbl-sub-inspect/delete-data",
};

const ConvertTblSubInspecthService = {
    // 0460008
    async getScreenData(params) {
        return axios.get(APP_LIST.getScreenData, {params});
    },
    async saveData(params) {
        return axios.post(APP_LIST.saveData, params);
    },
    async deleteData(params) {
        return axios.delete(APP_LIST.deleteData, { params });
    }

};

export default ConvertTblSubInspecthService;
