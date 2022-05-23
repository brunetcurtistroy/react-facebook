import axios from 'configs/axios';

const apiPaths = {
    getDataSupportItem: '/api/support-item/support-item',
    saveAndUpdateSupportItem: '/api/support-item/support-item/save-and-update',
    deleteSupportItem: '/api/support-item/support-item/delete',
};

const SupportItemService = {
    async getDataSupportItemService() {
        return axios.get(apiPaths.getDataSupportItem);
    },
    async saveAndUpdateSupportItemService(params){
        return axios.post(apiPaths.saveAndUpdateSupportItem, params)
    },
    async deleteSupportItemService(params){
        return axios.delete(apiPaths.deleteSupportItem, {params})
    },
};

export default SupportItemService;