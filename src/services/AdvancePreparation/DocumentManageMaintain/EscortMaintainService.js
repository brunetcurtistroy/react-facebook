import axios from "configs/axios";

const APP_LIST = {
    getDataTable: "/api/document-manage-maintain/escort-maintain",
    createAndUpdateData: "/api/document-manage-maintain/escort-maintain/save-and-update",
    deleteData: "/api/document-manage-maintain/escort-maintain/delete",
};

const EscortMaintainService = {
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

export default EscortMaintainService;
