import axios from 'configs/axios';

const apiPaths = {
    getDataContractInfoInquiry: '/api/group-bookings/contract-info-inquiry',
    getScreenContractInfoInquiry: '/api/group-bookings/contract-info-inquiry/get-screen-data',
    getDataSubContractInfoInquiry: '/api/group-bookings/contract-info-inquiry/sub'
};

const ContractInfoInquiryService = {
    async getDataContractInfoInquiryService(params) {
        return axios.get(apiPaths.getDataContractInfoInquiry, { params })
    },
    async getScreenContractInfoInquiryService(params) {
        return axios.get(apiPaths.getScreenContractInfoInquiry, { params })
    },
    async getDataSubContractInfoInquiryService(params) {
        return axios.get(apiPaths.getDataSubContractInfoInquiry, { params })
    },
};

export default ContractInfoInquiryService;