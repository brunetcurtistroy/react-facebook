import axios from "configs/axios";

const APP_LIST = {

    // Format
    getDataFormat: "/api/document-manage-maintain/escort-manage-maintain",
    getDataChangeFormat: "/api/document-manage-maintain/escort-manage-maintain/change-format",
    createAndUpdateFormat: "/api/document-manage-maintain/escort-manage-maintain/save-and-update",
    deleteFormat: "/api/document-manage-maintain/escort-manage-maintain/delete",

    // OptionInput
    getDataOptionInput: "/api/document-manage-maintain/escort-manage-maintain/option-input",
    getDataOptionInputDetail: "/api/document-manage-maintain/escort-manage-maintain/option-input/get-option-input",
    createAndUpdateOptionInput: "/api/document-manage-maintain/escort-manage-maintain/option-input/save-and-update",
    deleteOptionInput: "/api/document-manage-maintain/escort-manage-maintain/option-input/delete",
};

const EscortManageMaintainService = { 
    // Format
    async getDataFormat(params) {
        return axios.get(APP_LIST.getDataFormat, {params});
    },

    async getDataChangeFormat(params) {
        return axios.post(APP_LIST.getDataChangeFormat, params);
    },

    async createAndUpdateFormat(params) {
        return axios.post(APP_LIST.createAndUpdateFormat, params);
    },

    async deleteFormat(params) {
        return axios.delete(APP_LIST.deleteFormat, { params });
    },

    // OptionInput 
    async getDataOptionInput(params) {
        return axios.get(APP_LIST.getDataOptionInput, {params});
    },

    async getDataOptionInputDetail() {
        return axios.get(APP_LIST.getDataOptionInputDetail );
    },

    async createAndUpdateOptionInput(params) {
        return axios.post(APP_LIST.createAndUpdateOptionInput, params);
    },

    async deleteOptionInput(params) {
        return axios.delete(APP_LIST.deleteOptionInput, { params });
    }
};

export default EscortManageMaintainService;