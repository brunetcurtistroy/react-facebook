import axios from 'configs/axios';

const apiPaths = {
    getDataInsuranceSymbolInquiry: '/api/medical-exam-data-output-csv/insurance-symbol-inquiry',
};

const InsuranceSymbolInquiryService = {
    async getDataInsuranceSymbolInquiryService(params) {
        return axios.get(apiPaths.getDataInsuranceSymbolInquiry, {params});
    },
};

export default InsuranceSymbolInquiryService;