import axios from 'configs/axios';

const apiPaths = {
    getDataPatientInquiry: '/api/patient-info-capture-screen/patient-inquiry',
};

const PatientInquiryService = {
    async getDataPatientInquiryService(params) {
        return axios.get(apiPaths.getDataPatientInquiry, {params});
    },
};

export default PatientInquiryService;