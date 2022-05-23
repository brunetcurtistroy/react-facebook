import axios from "configs/axios";

const API_LIST = {
    getScreenData: "/api/consult-info-list/consult-info-list/get-screen-data",
    getDataBySearch: "/api/consult-info-list/consult-info-list/search-button",
    PrintF12: "/api/consult-info-list/consult-info-list/f12",
};

const ConsultInfoListService = {
    async getScreenData() {
        return axios.get(API_LIST.getScreenData);
    },

    async getDataBySearch(params) {
        return axios.post(API_LIST.getDataBySearch, params);
    },

    async PrintF12(params) {
        return axios.post(API_LIST.PrintF12, params, { responseType: 'blob' });
    }
};

export default ConsultInfoListService;