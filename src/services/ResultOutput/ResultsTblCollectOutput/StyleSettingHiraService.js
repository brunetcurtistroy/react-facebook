import axios from "configs/axios";

const apiPaths = {
    getListData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-setting-hira/list-data",
    saveData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-setting-hira/save-data",
    deleteData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-setting-hira/delete-data",
    f9: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-setting-hira/f9",
};

const StyleSettingHiraService = {
    async getListData(params) {
        return axios.get(apiPaths.getListData, {params});
    },
    async saveData(params) {
        return axios.post(apiPaths.saveData, params);
    },

    async deleteData(params) {
        return axios.delete(apiPaths.deleteData, { params });
    },

    async f9(params) {
        return axios.post(apiPaths.f9, params);
    },
};

export default StyleSettingHiraService;