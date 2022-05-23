import axios from "configs/axios";

const APP_LIST = {
    // 0460008
    getScreenData: "/api/csv-create-param-maintain/convert-tbl-sub-all/",
    saveData: "/api/csv-create-param-maintain/convert-tbl-sub-all/save-data",
    deleteData: "/api/csv-create-param-maintain/convert-tbl-sub-all/delete-data",
    changeexamcode: "/api/csv-create-param-maintain/convert-tbl-sub-all/change-exam-code",
};

const ConvertTblSubAllService = {
    // 0460008
    async getScreenData() {
        return axios.get(APP_LIST.getScreenData);
    },
    async saveData(params) {
        return axios.post(APP_LIST.saveData, params);
    },
    async deleteData(params) {
        return axios.delete(APP_LIST.deleteData, { params });
    },
    async changeexamcode(params) {
        return axios.post(APP_LIST.changeexamcode, params);
    }
};

export default ConvertTblSubAllService;
