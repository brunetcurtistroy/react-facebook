import axios from 'configs/axios';

const apiPaths = {
    getDataBreakdownInquiry: '/api/romoto-article52/breakdown-inquiry',
};

const BreakdownInquiryService = {
    async getDataBreakdownInquiryService(params) {
        return axios.get(apiPaths.getDataBreakdownInquiry, {params});
    },
};

export default BreakdownInquiryService;