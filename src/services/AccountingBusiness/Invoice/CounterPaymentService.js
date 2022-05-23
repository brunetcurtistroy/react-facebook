import axios from 'configs/axios';

const apiPaths = {
    getScreenCounterPayment: '/api/invoice/counter-payment/get-screen-data',
    changeBilliManagerNumCounterPayment: '/api/invoice/counter-payment/change-billiManagerNum',
    getInfoPageCounterPayment: '/api/invoice/counter-payment',
    getBillingDataDisplayCounterPayment: '/api/invoice/counter-payment/billing-data-display',
    
};

const CounterPaymentService = {
    async getScreenCounterPaymentService() {
        return axios.get(apiPaths.getScreenCounterPayment);
    },
    async changeBilliManagerNumCounterPaymentService(params) {
        return axios.post(apiPaths.changeBilliManagerNumCounterPayment, params);
    },
    async getInfoPageCounterPaymentService(params) {
        return axios.get(apiPaths.getInfoPageCounterPayment, { params });
    },
    async getBillingDataDisplayCounterPaymentService() {
        return axios.get(apiPaths.getBillingDataDisplayCounterPayment);
    },
};

export default CounterPaymentService;