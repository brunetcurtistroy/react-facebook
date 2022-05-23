import axios from "configs/axios";

const apiPaths = {
    // Key Info
    getDataKeyInfo: "/api/progress-setting/visits-key-info-setting/get-screen-data",
    createKeyInfo: "/api/progress-setting/visits-key-info-setting/create-data-parent",
    updateKeyInfo: "/api/progress-setting/visits-key-info-setting/update",
    deleteKeyInfo: "/api/progress-setting/visits-key-info-setting/delete",

    // key breakdown
    getDataKeyBreakdown: "/api/progress-setting/visits-key-info-setting/key-breakdown",
    createAndUpdateKeyBreakdown: "/api/progress-setting/visits-key-info-setting/create-data-child",
    deleteKeyBreakdown: "/api/progress-setting/visits-key-info-setting/delete-child",
};

const VisitsKeyInfoSettingSevice = {
    async getDataKeyInfo() {
        return axios.get(apiPaths.getDataKeyInfo);
    },

    async createKeyInfo(params) {
        return axios.post(apiPaths.createKeyInfo, params);
    },

    async updateKeyInfo(params) {
        return axios.put(apiPaths.updateKeyInfo, params);
    },

    async deleteKeyInfo(params) {
        return axios.delete(apiPaths.deleteKeyInfo, { params });
    },

    // KeyBreakdown
    async getDataKeyBreakdown(params) {
        return axios.get(apiPaths.getDataKeyBreakdown, { params });
    },

    async createAndUpdateKeyBreakdown(params) {
        return axios.post(apiPaths.createAndUpdateKeyBreakdown, params);
    },

    async deleteKeyBreakdown(params) {
        return axios.delete(apiPaths.deleteKeyBreakdown, { params });
    },
};

export default VisitsKeyInfoSettingSevice;
