import axios from "configs/axios";

const apiPaths = {
    getIntroduceCounter: '/api/counter/counter',
    getListDataCounter: '/api/counter/counter/get-list-data',
    AcceptButton: '/api/counter/counter/accept',
    getRefine: '/api/counter/refine',
    getReceiptProcessSub: '/api/counter/receipt-process-sub',
    getDispensingProcessSub: '/api/counter/dispensing-process-sub',
    getSplitDispensingProcessSub: '/api/counter/dispensing-process-sub/split',
    getScreenData: '/api/counter/refine/get-screen-data',
    eventEnterC_Counter: '/api/counter/counter/enter-c',
    userAction3Counter: '/api/counter/counter/user-action-3'
}

const CounterService = {
    async getIntroduceCounterService(params) {
        return axios.get(apiPaths.getIntroduceCounter, {params})
    },
    async getListDataCounterService() {
        return axios.get(apiPaths.getListDataCounter)
    },
    async AcceptButtonService(params) {
        return axios.post(apiPaths.AcceptButton, params)
    },
    async getRefineService(params) {
        return axios.get(apiPaths.getRefine, {params})
    },
    async getSrceenData(params) {
        return axios.get(apiPaths.getScreenData, {params})
    },
    async eventEnterC_CounterService(params) {
        return axios.get(apiPaths.eventEnterC_Counter, {params})
    },
    async userAction3CounterService(params) {
        return axios.post(apiPaths.userAction3Counter, params)
    },
}

export default CounterService;