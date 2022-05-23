import axios from "configs/axios";

const APP_LIST = {
    getDataScreen: "/api/not-input-check-category/input-vote-result-input-inspect-input/get-screen-data",
    index: "/api/not-input-check-category/input-vote-result-input-inspect-input",
    findingsEditing: "/api/not-input-check-category/input-vote-result-input-inspect-input/findings-editing",
    findingsEditingAfter: "/api/not-input-check-category/input-vote-result-input-inspect-input/findings-editing-after ",
    saveData: "/api/not-input-check-category/input-vote-result-input-inspect-input/save",
    resultValueConvert: "/api/not-input-check-category/input-vote-result-input-inspect-input/result-value-convert",
    specifiedValue: "/api/not-input-check-category/input-vote-result-input-inspect-input/specified-value",
    findingsEditingAfter274: "/api/not-input-check-category/input-vote-result-input-inspect-input/findings-editing-after-274",
    controlpreffit: "/api/not-input-check-category/input-vote-result-input-inspect-input/control-preffit",
    controlsuffit: "/api/not-input-check-category/input-vote-result-input-inspect-input/control-suffit",
    
};

const InputVoteResultInputInspectInputService = {
    async getDataScreen(params) {
        return axios.get(APP_LIST.getDataScreen, { params });
    },
    async index(params) {
        return axios.get(APP_LIST.index, { params });
    },

    async findingsEditing(params) {
        return axios.post(APP_LIST.findingsEditing, params);
    },

    async findingsEditingAfter(params) {
        return axios.post(APP_LIST.findingsEditingAfter, params);
    },

    async findingsEditingAfter274(params) {
        return axios.post(APP_LIST.findingsEditingAfter274, params);
    },

    async saveData(params) {
        return axios.post(APP_LIST.saveData, params);
    },

    async controlpreffit(params) {
        return axios.post(APP_LIST.controlpreffit, params);
    },

    async resultValueConvert(params) {
        return axios.post(APP_LIST.resultValueConvert, params);
    },

    async specifiedValue(params) {
        return axios.post(APP_LIST.specifiedValue, params);
    }
};

export default InputVoteResultInputInspectInputService;
