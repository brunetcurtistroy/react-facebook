import axios from "configs/axios";

const APP_LIST = {
    getDataTable: "/api/document-manage-maintain/escort-detail-sub",
    updateRecordData: "/api/document-manage-maintain/escort-detail-sub/save-and-update",
    updateDataBtn: "/api/document-manage-maintain/escort-detail-sub/update-btn",
    deleteRecordData: "/api/document-manage-maintain/escort-detail-sub/delete",
};

const EscortDetailSubService = {
    async getDataTable(params) {
        return axios.post(APP_LIST.getDataTable, params);
    },

    async updateRecordData(params) {
        return axios.post(APP_LIST.updateRecordData, params);
    },

    async updateDataBtn(params) {
        return axios.post(APP_LIST.updateDataBtn, params);
    },

    async deleteRecordData(params) {
        return axios.delete(APP_LIST.deleteRecordData, { params });
    }
};

export default EscortDetailSubService;
