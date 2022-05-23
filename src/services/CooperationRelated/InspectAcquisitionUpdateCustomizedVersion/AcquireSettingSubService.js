import axios from "configs/axios";

const apiPaths = {
    getDataScreen: "/api/inspect-acquisition-update-customized-version/acquire-setting-sub",
    updateData: '/api/inspect-acquisition-update-customized-version/acquire-setting-sub/update-btn'
};

const AcquireSettingSubService = {
    async getDataScreen(params) {
        return axios.get(apiPaths.getDataScreen, { params });
    },

    async updateData(params) {
        return axios.post(apiPaths.updateData, params);
    }
};

export default AcquireSettingSubService;
