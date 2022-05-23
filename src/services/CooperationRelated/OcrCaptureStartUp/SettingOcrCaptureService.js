import axios from "configs/axios";

const apiPaths = {
    getDataOrcCapture: "/api/ocr-capture-start-up/setting-ocr-capture",
    saveDataOrcCapture: "/api/ocr-capture-start-up/setting-ocr-capture/save-data",
    deleteDataOrcCapture: "/api/ocr-capture-start-up/setting-ocr-capture/delete-data",

    getDataOrcFormat: "/api/ocr-capture-start-up/setting-ocr-capture/ocr-format",
    saveDataOrcFormat: "/api/ocr-capture-start-up/setting-ocr-capture/ocr-format/save-data",
    deleteDataOrcFormat: "/api/ocr-capture-start-up/setting-ocr-capture/ocr-format/delete-data",

    getDataAdvanceSetting: "/api/ocr-capture-start-up/setting-ocr-capture/ocr-format/advanced-setting",
    saveDataAdvanceSetting: "/api/ocr-capture-start-up/setting-ocr-capture/ocr-format/advanced-setting/save-data",
    getDataOptionInput: "/api/ocr-capture-start-up/setting-ocr-capture/ocr-format/advanced-setting/option-input",
};

const SettingOcrCaptureService = {
    async getDataOrcCapture() {
        return axios.get(apiPaths.getDataOrcCapture);
    },

    async saveDataOrcCapture(params) {
        return axios.post(apiPaths.saveDataOrcCapture, params);
    },

    async deleteDataOrcCapture(params) {
        return axios.delete(apiPaths.deleteDataOrcCapture, { params });
    },

    async getDataOrcFormat(params) {
        return axios.get(apiPaths.getDataOrcFormat, { params });
    },

    async saveDataOrcFormat(params) {
        return axios.post(apiPaths.saveDataOrcFormat, params);
    },

    async deleteDataOrcFormat(params) {
        return axios.delete(apiPaths.deleteDataOrcFormat, { params });
    },

    async getDataAdvanceSetting(params) {
        return axios.get(apiPaths.getDataAdvanceSetting, { params });
    },

    async saveDataAdvanceSetting(params) {
        return axios.post(apiPaths.saveDataAdvanceSetting, params);
    },

    async getDataOptionInput(params) {
        return axios.get(apiPaths.getDataOptionInput, { params });
    }

};

export default SettingOcrCaptureService;
