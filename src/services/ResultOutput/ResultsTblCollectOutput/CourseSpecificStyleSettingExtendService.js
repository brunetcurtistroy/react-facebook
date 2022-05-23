import axios from "configs/axios";

const apiPaths = {
    getListData: "/api/results-tbl-collect-output/course-specific-style-setting-extend",
    saveData: "/api/results-tbl-collect-output/course-specific-style-setting-extend/save-data",
    daleteData: "/api/results-tbl-collect-output/course-specific-style-setting-extend/delete-data",
};

const CourseSpecificStyleSettingExtendService = {
    async getListData() {
        return axios.get(apiPaths.getListData);
    },

    async saveData(params) {
        return axios.post(apiPaths.saveData, params);
    },

    async daleteData(params) {
        return axios.delete(apiPaths.daleteData, { params });
    }
};

export default CourseSpecificStyleSettingExtendService;
