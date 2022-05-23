import axios from 'configs/axios';

const apiPaths = {
    getScreenDataAcquireSettingSub: '/api/patient-info-capture-screen/acquire-setting-sub/get-screen-data',
    enterCAcquireSettingSub: '/api/patient-info-capture-screen/acquire-setting-sub/enter-c',
    updateBtnAcquireSettingSub: '/api/patient-info-capture-screen/acquire-setting-sub/update-btn'
};

const AcquireSettingSubService = {
    async getScreenDataAcquireSettingSubService() {
        return axios.get(apiPaths.getScreenDataAcquireSettingSub);
    },
    async enterCAcquireSettingSubService(params) {
        return axios.post(apiPaths.enterCAcquireSettingSub, params);
    },
    async updateBtnAcquireSettingSubService(params) {
        return axios.post(apiPaths.updateBtnAcquireSettingSub, params);
    },
};

export default AcquireSettingSubService;