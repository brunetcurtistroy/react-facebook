import axios from "configs/axios";

const APP_LIST = {
    getConditionSet: "/api/document-manage-maintain/basic-condition-set",

    // inspect-category-set
    getDataInspectCategory: "/api/document-manage-maintain/basic-condition-set/inspect-category-set",
    createAndUpdateInspectCategory: "/api/document-manage-maintain/basic-condition-set/inspect-category-set/save-and-update",
    deleteInspectCategory: "/api/document-manage-maintain/basic-condition-set/inspect-category-set/delete",

    // facilities-set
    getScreenFacilities: '/api/document-manage-maintain/basic-condition-set/facilities-set/get-screen-data',
    getDataFacilities: "/api/document-manage-maintain/basic-condition-set/facilities-set",
    createAndUpdateFacilities: "/api/document-manage-maintain/basic-condition-set/facilities-set/save-and-update",
    deleteFacilities: "/api/document-manage-maintain/basic-condition-set/facilities-set/delete",

    // time-settings
    getDataTimeSetting: "/api/document-manage-maintain/basic-condition-set/time-settings",
    createAndUpdateTimeSetting: "/api/document-manage-maintain/basic-condition-set/time-settings/save-and-update",
    deleteTimeSetting: "/api/document-manage-maintain/basic-condition-set/time-settings/delete",
};

const BasicConditionSetService = {
    async getConditionSet(params) {
        return axios.get(APP_LIST.getConditionSet, { params });
    },

    // inspect-category-set
    async getDataInspectCategory() {
        return axios.get(APP_LIST.getDataInspectCategory);
    },

    async createAndUpdateInspectCategory(params) {
        return axios.post(APP_LIST.createAndUpdateInspectCategory, params);
    },

    async deleteInspectCategory(params) {
        return axios.delete(APP_LIST.deleteInspectCategory, { params });
    },

    // facilities-set
    async getScreenFacilities() {
        return axios.get(APP_LIST.getScreenFacilities);
    },

    async getDataFacilities() {
        return axios.get(APP_LIST.getDataFacilities);
    },

    async createAndUpdateFacilities(params) {
        return axios.post(APP_LIST.createAndUpdateFacilities, params);
    },

    async deleteFacilities(params) {
        return axios.delete(APP_LIST.deleteFacilities, { params });
    },

    // time-settings
    async getDataTimeSetting() {
        return axios.get(APP_LIST.getDataTimeSetting);
    },

    async createAndUpdateTimeSetting(params) {
        return axios.post(APP_LIST.createAndUpdateTimeSetting, params);
    },

    async deleteTimeSetting(params) {
        return axios.delete(APP_LIST.deleteTimeSetting, { params });
    }
};

export default BasicConditionSetService;