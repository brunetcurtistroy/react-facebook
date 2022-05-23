import axios from 'configs/axios';

const apiPaths = {
    getDataBillingInquirySub: '/api/progress-setting/billing-inquiry-sub/get-data',
    getListDataInvoiceSub: '/api/progress-setting/billing-inquiry-sub/get-list-invoice-sub',
    getListDataPaymentSub: '/api/progress-setting/billing-inquiry-sub/get-list-payment-sub'
};

const BillingInquirySubService = {
    async getDataBillingInquirySubService(params) {
        return axios.get(apiPaths.getDataBillingInquirySub, {params});
    },
    async getListDataInvoiceSubService(params) {
        return axios.get(apiPaths.getListDataInvoiceSub, {params});
    },
    async getListDataPaymentSubService(params) {
        return axios.get(apiPaths.getListDataPaymentSub, {params});
    },
};

export default BillingInquirySubService;