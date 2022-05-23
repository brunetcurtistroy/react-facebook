import axios from "configs/axios";

const APP_LIST = {
    getDataOutputPattern: "/api/document-manage-maintain/output-pattern-sub",
    createAndUpdateOutputPattern: "/api/document-manage-maintain/output-pattern-sub/save-and-update",
    deleteOutputPattern: "/api/document-manage-maintain/output-pattern-sub/delete",
    changeTarget: "/api/document-manage-maintain/output-pattern-sub/f9-and-f10",
    
    getDataDetail: "/api/document-manage-maintain/output-pattern-sub/details",
    updateDetail: "/api/document-manage-maintain/output-pattern-sub/save-details"
};

const OutputPatternSubService = {
    async getDataOutputPattern() {
        return axios.get(APP_LIST.getDataOutputPattern);
    },

    async createAndUpdateOutputPattern(params) {
        return axios.post(APP_LIST.createAndUpdateOutputPattern, params);
    },

    async changeTarget(params) {
        return axios.post(APP_LIST.changeTarget, params);
    },

    async deleteOutputPattern(params) {
        return axios.delete(APP_LIST.deleteOutputPattern, { params });
    },

    async getDataDetail(params) {
        return axios.get(APP_LIST.getDataDetail, {params});
    },

    async updateDetail(params) {
        return axios.post(APP_LIST.updateDetail, params);
    }
};

export default OutputPatternSubService;
