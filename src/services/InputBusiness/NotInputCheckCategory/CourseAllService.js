import axios from "configs/axios";

const APP_LIST = {
    getDataScreen: "/api/not-input-check-category/course-all/get-screen-data",
    getListData: "/api/not-input-check-category/course-all/get-list-data",
};

const CourseAllService = {
    async getDataScreen(params) {
        return axios.get(APP_LIST.getDataScreen, { params });
    },

    async getListData(params) {
        return axios.get(APP_LIST.getListData, { params });
    }
};

export default CourseAllService;
