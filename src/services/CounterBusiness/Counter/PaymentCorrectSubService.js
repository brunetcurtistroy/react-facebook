import axios from "configs/axios";

const apiPaths = {
    getIndex: '/api/counter/payment-correct-sub',
    paymentCorrectSub: "/api/counter/payment-correct-sub/payment-correct-sub",
    saveService: "/api/counter/payment-correct-sub/save"
}

const PaymentCorrectSubService = {
    async getIndex(params) {
        return axios.get(apiPaths.getIndex, {params})
    },
    async paymentCorrectSub(params) {
        return axios.get(apiPaths.paymentCorrectSub, {params})
    },
    async save(params){
        return axios.post(apiPaths.saveService, params)
    }
}

export default PaymentCorrectSubService;