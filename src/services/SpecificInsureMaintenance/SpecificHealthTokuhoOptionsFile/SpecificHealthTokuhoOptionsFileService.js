import axios from 'configs/axios';

const apiPaths = {
    getSpecificHealthTokuhoOptionsFile: '/api/specific-health-tokuho-options-file/specific-health-tokuho-options-file',
    saveAndUpdateSpecificHealthTokuho: '/api/specific-health-tokuho-options-file/specific-health-tokuho-options-file/save-and-update',
    deleteSpecificHealthTokuhoOptionsFile: '/api/specific-health-tokuho-options-file/specific-health-tokuho-options-file/delete',
};

const SpecificHealthTokuhoOptionsFileService = {
    async getSpecificHealthTokuhoOptionsFileService() {
        return axios.get(apiPaths.getSpecificHealthTokuhoOptionsFile);
    },
    async saveAndUpdateSpecificHealthTokuhoService(params){
        return axios.post(apiPaths.saveAndUpdateSpecificHealthTokuho, params)
    },
    async deleteSpecificHealthTokuhoOptionsFileService(params){
        return axios.delete(apiPaths.deleteSpecificHealthTokuhoOptionsFile, {params})
    },
};

export default SpecificHealthTokuhoOptionsFileService;