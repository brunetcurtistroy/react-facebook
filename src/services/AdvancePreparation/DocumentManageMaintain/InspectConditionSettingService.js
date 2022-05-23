import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/document-manage-maintain/inspect-condition-setting/get-screen-data",
    getDataTable: "/api/document-manage-maintain/inspect-condition-setting",
    createAndUpdateData: "/api/document-manage-maintain/inspect-condition-setting/save-and-update",
    deleteData: "/api/document-manage-maintain/inspect-condition-setting/delete",
};

const InspectConditionSettingService = {
    async getScreenData(params) {
        return axios.get(APP_LIST.getScreenData, { params });
    },

    async getDataTable() {
        return axios.get(APP_LIST.getDataTable);
    },

    async createAndUpdateData(params) {
        return axios.post(APP_LIST.createAndUpdateData, params);
    },

    async deleteData(params) {
        return axios.delete(APP_LIST.deleteData, { params });
    }
};

export default InspectConditionSettingService;
