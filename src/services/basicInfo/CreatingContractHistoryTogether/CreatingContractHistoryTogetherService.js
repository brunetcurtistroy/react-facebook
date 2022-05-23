import axios from 'configs/axios';

const apiPaths = {
    getScreenDataCreatingContractHistoryTogether: '/api/create-contract-history-together/get-screen-data',
    displayButtonCreatingContractHistoryTogether: '/api/create-contract-history-together/display-button',
    getDataCreatingContractHistoryTogether: '/api/create-contract-history-together/contract-history-list-sub',
    eventF12CreatingContractHistoryTogether: '/api/create-contract-history-together/f12',
    selectOneLineCreatingContractHistoryTogether: ' /api/create-contract-history-together/w1-enabled-disabled',
    selectAllCreatingContractHistoryTogether: '/api/create-contract-history-together/select-all',
}

const CreatingContractHistoryTogetherService = {
    async getScreenDataCreatingContractHistoryTogetherService (params){
        return axios.get(apiPaths.getScreenDataCreatingContractHistoryTogether, {params})
    },

    async displayButtonCreatingContractHistoryTogetherService (params){
        return axios.post(apiPaths.displayButtonCreatingContractHistoryTogether, params)
    },

    async getDataCreatingContractHistoryTogetherService (){
        return axios.get(apiPaths.getDataCreatingContractHistoryTogether)
    },

    async eventF12CreatingContractHistoryTogetherService (params){
        return axios.post(apiPaths.eventF12CreatingContractHistoryTogether, params)
    },

    async selectOneLineCreatingContractHistoryTogetherService (params){
        return axios.post(apiPaths.selectOneLineCreatingContractHistoryTogether, params)
    },

    async selectAllCreatingContractHistoryTogetherService (params){
        return axios.post(apiPaths.selectAllCreatingContractHistoryTogether, params)
    },
}

export default CreatingContractHistoryTogetherService;