import axios from "configs/axios";

const apiPaths = {
    getScreenData: '/api/counter/receipt-process-sub/get-screen-data',
    confirmF12: '/api/counter/receipt-process-sub/confirm-f12',
    getOptionInspect: '/api/counter/receipt-process-sub/option-inspect',
    getIndex: '/api/counter/receipt-process-sub/receipt-content-correction'
}

const ReceiptProcessSubService = {
    async getScreenData(params) {
        return axios.get(apiPaths.getScreenData, {params})
    },
    async getIndex(params) {
        return axios.get(apiPaths.getIndex, {params})
    },
    async confirmF12(params) {
        return axios.post(apiPaths.confirmF12, params)
    },
    async getOptionInspect(params) {
        return axios.get(apiPaths.getOptionInspect, {params})
    },

}

export default ReceiptProcessSubService;