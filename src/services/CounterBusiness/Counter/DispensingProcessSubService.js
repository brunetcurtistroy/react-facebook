import axios from "configs/axios";

const apiPaths = {
    getScreenData: '/api/counter/dispensing-process-sub',
    confirmF12: '/api/counter/dispensing-process-sub/confirm',
    split: '/api/counter/dispensing-process-sub/split'
}

const DispensingProcessSubService = {
    async getScreenData(params) {
        return axios.get(apiPaths.getScreenData, {params})
    },
    async confirmF12(params) {
        return axios.post(apiPaths.confirmF12, params)
    },
    async split(params) {
        return axios.get(apiPaths.split, {params})
    },
}

export default DispensingProcessSubService;