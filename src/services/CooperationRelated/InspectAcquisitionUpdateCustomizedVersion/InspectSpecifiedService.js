import axios from "configs/axios";

const apiPaths = {
    getDataScreen: "/api/inspect-acquisition-update-customized-version/acquire-setting-sub/inspect-specified-btn",
    updateData: '/api/inspect-acquisition-update-customized-version/acquire-setting-sub/update-data'
};

const InspectSpecifiedService = {
    async getDataScreen(params) {
        return axios.get(apiPaths.getDataScreen, { params });
    }
};

export default InspectSpecifiedService;
