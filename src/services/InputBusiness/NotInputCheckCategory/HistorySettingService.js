import axios from "configs/axios";

const APP_LIST = {
    getDataScreen: "/api/not-input-check-category/history-setting/get-screen-data",
    closeScreen: "/api/not-input-check-category/history-setting/close-screen",
    saveData: "/api/not-input-check-category/history-setting/save-data",
};

const HistorySettingService = {
    async getDataScreen(params) {
        return axios.get(APP_LIST.getDataScreen, { params });
    },

    async closeScreen(params) {
        return axios.post(APP_LIST.closeScreen, params);
    },

    async saveData(params) {
        return axios.post(APP_LIST.saveData, params);
    }
};

export default HistorySettingService;
