import axios from 'configs/axios';

const apiPaths = {
    getScreenDataMiraisSingleTransmission: '/api/mirais-single-transmission/mirais-single-transmission/get-screen-data',
    getListDataMiraisSingleTransmission: '/api/mirais-single-transmission/mirais-single-transmission/get-list-data',
    modifyDataMiraisSingleTransmission: '/api/mirais-single-transmission/mirais-single-transmission/update',
    SubmitBtnMiraisSingleTransmission: '/api/mirais-single-transmission/mirais-single-transmission/submit-btn',
    ExtractBtnMiraisSingleTransmission: '/api/mirais-single-transmission/mirais-single-transmission/extract-btn',
    destroyMiraisSingleTransmission: '/api/mirais-single-transmission/mirais-single-transmission/destroy',
    SubmitBtnBeforeMiraisSingleTransmission: '/api/mirais-single-transmission/mirais-single-transmission/submit-btn-before'
};

const MiraisSingleTransmissionService = {
    async getScreenDataMiraisSingleTransmissionService(params) {
        return axios.get(apiPaths.getScreenDataMiraisSingleTransmission, {params});
    },
    async getListDataMiraisSingleTransmissionService(params) {
        return axios.get(apiPaths.getListDataMiraisSingleTransmission, {params});
    },
    async modifyDataMiraisSingleTransmissionService(params) {
        return axios.put(apiPaths.modifyDataMiraisSingleTransmission, params);
    },
    async SubmitBtnBeforeMiraisSingleTransmissionService(params) {
        return axios.get(apiPaths.SubmitBtnBeforeMiraisSingleTransmission, {params});
    },
    async SubmitBtnMiraisSingleTransmissionService(params) {
        return axios.get(apiPaths.SubmitBtnMiraisSingleTransmission, {params});
    },
    async ExtractBtnMiraisSingleTransmissionService(params) {
        return axios.get(apiPaths.ExtractBtnMiraisSingleTransmission, {params});
    },
    async destroyMiraisSingleTransmissionService(params) {
        return axios.delete(apiPaths.destroyMiraisSingleTransmission, {params});
    },
};

export default MiraisSingleTransmissionService;