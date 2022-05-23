import axios from "configs/axios";

const apiPaths = {
    getListData: "/api/results-tbl-collect-output/course-based-determine-by-style-setting",
    saveData: "/api/results-tbl-collect-output/course-based-determine-by-style-setting/save-data",
    deleteData: "/api/results-tbl-collect-output/course-based-determine-by-style-setting/delete-data",
    findnext: "/api/results-tbl-collect-output/course-based-determine-by-style-setting/find-next",

};


const CourseBasedDetermineByStyleSettingService = {
    async getListData() {
        return axios.get(apiPaths.getListData);
    },
    async saveData(params) {
        return axios.post(apiPaths.saveData, params);
    },
    async deleteData(params) {
        return axios.delete(apiPaths.deleteData, { params });
    }
};

export default CourseBasedDetermineByStyleSettingService;
