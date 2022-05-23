import axios from 'configs/axios';

const apiPaths = {
    getScreenDataUserOptionInfoMaintain: '/api/user-option-info-maintain/user-option-info-maintain/get-screen-data',
    getDataOptionCode: '/api/user-option-info-maintain/user-option-info-maintain/get-list-data',
    getDataOptionInput: '/api/user-option-info-maintain/user-option-info-maintain/option-input',
    saveOrUpdateDataOptionCode: '/api/user-option-info-maintain/user-option-info-maintain/save-option-code',
    saveOrUpdateDataOptionInput: '/api/user-option-info-maintain/user-option-info-maintain/save-option-code-child',
    deleteOptionCode: '/api/user-option-info-maintain/user-option-info-maintain/delete-option-code',
};

const UserOptionInfoMaintainService = {
    async getScreenDataUserOptionInfoMaintainService() {
        return axios.get(apiPaths.getScreenDataUserOptionInfoMaintain);
    },
    async getDataOptionCodeService(params) {
        return axios.get(apiPaths.getDataOptionCode, { params });
    },
    async getDataOptionInputService(params) {
        return axios.get(apiPaths.getDataOptionInput, { params });
    },
    async saveOrUpdateDataOptionCodeService(params){
        return axios.post(apiPaths.saveOrUpdateDataOptionCode, params)
    },
    async saveOrUpdateDataOptionInputService(params){
        return axios.post(apiPaths.saveOrUpdateDataOptionInput, params)
    },
    async deleteOptionCodeService(params){
        return axios.delete(apiPaths.deleteOptionCode, {params})
    },
};

export default UserOptionInfoMaintainService;