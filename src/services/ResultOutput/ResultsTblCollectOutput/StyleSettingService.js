import axios from "configs/axios";

const apiPaths = {
    getListData: "/api/results-tbl-collect-output/course-specific-style-setting-extend/style-setting",
    saveData: "/api/results-tbl-collect-output/course-specific-style-setting-extend/style-setting/save-data",
    deleteData: "/api/results-tbl-collect-output/course-specific-style-setting-extend/style-setting/delete-data",
    run_F12: "/api/results-tbl-collect-output/course-specific-style-setting-extend/style-setting/f12",
};

const StyleSettingService = {
    async getListData(params) {
        return axios.get(apiPaths.getListData, {params});
    },

    async saveData(params) {
        return axios.post(apiPaths.saveData, params);
    },

    async deleteData(params) {
        return axios.delete(apiPaths.deleteData, { params });
    },

    async run_F12(params) {
        return axios.post(apiPaths.run_F12, params);
    },
};

export default StyleSettingService;
