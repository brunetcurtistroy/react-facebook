import axios from 'configs/axios';

const apiPaths = {
    ListData: '/api/not-input-check-category/specified-value-confirm',
    SettingBtn: '/api/not-input-check-category/specified-value-confirm/setting-btn',
    OKbtn: '/api/not-input-check-category/specified-value-confirm/okbtn',
};

const SpecifiedValueConfirmService = {
    async ListData(params) {
        return axios.get(apiPaths.ListData, {params});
    },
    async SettingBtn(params) {
        return axios.post(apiPaths.SettingBtn, params);
    },
    async OKbtn(params) {
        return axios.post(apiPaths.OKbtn, params);
    },
};

export default SpecifiedValueConfirmService;