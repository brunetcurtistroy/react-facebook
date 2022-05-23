import axios from 'configs/axios';

const apiPaths = {
    getInfoDataConsultInquirySub: '/api/progress-setting/consult-inquiry-sub/get-info',
    VisitsInspectConsultInquirySub: '/api/progress-setting/consult-inquiry-sub/visits-inspect'
};

const ConsultInquirySubService = {
    async getInfoDataConsultInquirySubService(params) {
        return axios.get(apiPaths.getInfoDataConsultInquirySub, {params});
    },
    async VisitsInspectConsultInquirySubService(params) {
        return axios.post(apiPaths.VisitsInspectConsultInquirySub, params);
    },
};

export default ConsultInquirySubService;