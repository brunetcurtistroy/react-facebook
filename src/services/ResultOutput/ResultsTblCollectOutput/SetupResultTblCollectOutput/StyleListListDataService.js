import axios from "configs/axios";

const apiPaths = {
    getListData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-list/list-data",
    saveData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-list/save-data",
    deleteData: "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-list/delete-data",
};

const StyleListListDataService = {
    async getListData() {
        return axios.get(apiPaths.getListData);
    },
    async saveData(params) {
        return axios.post(apiPaths.saveData, params);
    },

    async deleteData(params) {
        return axios.delete(apiPaths.deleteData, { params });
    },
};

export default StyleListListDataService;
