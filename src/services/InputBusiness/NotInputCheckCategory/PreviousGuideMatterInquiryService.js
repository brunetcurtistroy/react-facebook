import axios from 'configs/axios';

const apiPaths = {
    BeforeCallScreen: '/api/not-input-check-category/previous-guide-matter-inquiry/before-call-screen',
    AfterCallScreen: '/api/not-input-check-category/previous-guide-matter-inquiry/after-call-screen',

};

const PreviousGuideMatterInquiryService = {
    async BeforeCallScreen(params) {
        return axios.post(apiPaths.BeforeCallScreen, params);
    },
    async AfterCallScreen(params) {
        return axios.post(apiPaths.AfterCallScreen, params);
    },
};

export default PreviousGuideMatterInquiryService;