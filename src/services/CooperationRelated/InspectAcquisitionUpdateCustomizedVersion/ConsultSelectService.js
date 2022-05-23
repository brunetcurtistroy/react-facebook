import axios from "configs/axios";

const apiPaths = {
    getListData: "/api/inspect-acquisition-update-customized-version/consult-select/list-data",
    changeSelect: '/api/inspect-acquisition-update-customized-version/consult-select/change',
    closeScreen: '/api/inspect-acquisition-update-customized-version/consult-select/update'
};

const ConsultSelectService = {
    async getListData(params) {
        return axios.get(apiPaths.getListData, { params });
    },

    async closeScreen(params) {
        return axios.post(apiPaths.closeScreen, params);
    },
    async changeSelect(params) {
        return axios.post(apiPaths.changeSelect, params);
    }
};

export default ConsultSelectService;
