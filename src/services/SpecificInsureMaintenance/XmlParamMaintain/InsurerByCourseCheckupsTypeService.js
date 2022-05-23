import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/xml-param-maintain/insurer-by-course-checkups-type",
    createAndUpdate: "/api/xml-param-maintain/insurer-by-course-checkups-type/save-and-update",
    deleteData: "/api/xml-param-maintain/insurer-by-course-checkups-type/delete"
};

const InsurerByCourseCheckupsTypeService = {
    async getScreenDataService() {
        return axios.get(APP_LIST.getScreenData);
    },

    async createAndUpdateDataService(params) {
        return axios.post(APP_LIST.createAndUpdate, params);
    },

    async deleteDataService(params) {
        return axios.delete(APP_LIST.deleteData, { params });
    }
};

export default InsurerByCourseCheckupsTypeService;
