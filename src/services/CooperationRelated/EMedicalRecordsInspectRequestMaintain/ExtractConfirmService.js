import axios from "configs/axios";

const APP_LIST = {
    request_F11: "/api/e-medical-records-inspect-request-maintain/extract-confirm/request-form-f11",
    extract_F12: "/api/e-medical-records-inspect-request-maintain/extract-confirm/extract-f12",
};

const ExtractConfirmService = {
    async request_F11(params) {
        return axios.post(APP_LIST.request_F11, params);
    },

    async extract_F12(params) {
        return axios.post(APP_LIST.extract_F12, params);
    }
};

export default ExtractConfirmService;
