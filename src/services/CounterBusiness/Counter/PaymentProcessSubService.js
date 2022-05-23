import axios from "configs/axios";

const apiPaths = {
    getScreenData: '/api/counter/payment-process-sub/get-screen-data',
    confirmF12: '/api/counter/payment-process-sub/confirm-f12',
    payDateCharChange: '/api/counter/payment-process-sub/pay-date-char-change',
    split: '/api/counter/payment-process-sub/split'
}

const PaymentProcessSubService = {
    async getScreenData(params) {
        return axios.get(apiPaths.getScreenData, {params})
    },
    async confirmF12(params) {
        return axios.post(apiPaths.confirmF12, params)
    },
    async payDateCharChange(params) {
        return axios.post(apiPaths.payDateCharChange, params)
    },
    async split(params) {
        return axios.post(apiPaths.split, params)
    },
}

export default PaymentProcessSubService;