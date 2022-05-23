import axios from 'configs/axios';

const apiPaths = {
    getDataContractCompiledMaintain: '/api/contract-complied-maintain/contract-complied-maintain/get-screen-data',
    saveDataContractCompiledMaintain: '/api/contract-complied-maintain/contract-complied-maintain/save-data',
    deleteDataContractCompiledMaintain: '/api/contract-complied-maintain/contract-complied-maintain/delete-data',
    getDataCompiledSelect: '/api/contract-complied-maintain/contract-complied-maintain/get-screen-data-compiled-select',
};

const ContractCompiledMaintainService = {
    // WS1305001_ContractCompiledMaintain
    async getDataContractCompiledMaintainService() {
        return axios.get(apiPaths.getDataContractCompiledMaintain);
    },
    async saveDataContractCompiledMaintainService(params) {
        return axios.put(apiPaths.saveDataContractCompiledMaintain, params)
    },
    async deleteDataContractCompiledMaintainService(params) {
        return axios.delete(apiPaths.deleteDataContractCompiledMaintain, { params })
    },
    // WS1305004_CompiledSelect
    async getDataCompiledSelectService() {
        return axios.get(apiPaths.getDataCompiledSelect);
    },
};

export default ContractCompiledMaintainService;