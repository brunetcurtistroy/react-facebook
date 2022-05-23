import axios from 'configs/axios';

const apiPaths = {
    getScreenData: '/api/inspect-item-info-maintain/inspect-item-info-maintain/get-screen-data',
    deleteData: '/api/inspect-item-info-maintain/inspect-item-info-maintain/delete-data'
};

const InspectItemInfoMaintainService = {
    async getScreenDataService(params) {
        return axios.get(apiPaths.getScreenData, {params});
    },
    async deleteDataService(params){
        return axios.delete(apiPaths.deleteData, {params})
    },
};

export default InspectItemInfoMaintainService;