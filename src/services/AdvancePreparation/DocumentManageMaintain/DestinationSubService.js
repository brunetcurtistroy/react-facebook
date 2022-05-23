import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/document-manage-maintain/destination-sub",
    createAndUpdate: "/api/document-manage-maintain/destination-sub/save-and-update",
    deleteData: "/api/document-manage-maintain/destination-sub/delete"
};

const DestinationSubService = {
    async getScreenDataService() {
        return axios.get(APP_LIST.getScreenData);
    },

    async createAndUpdateDataService(params) {
        return axios.post(APP_LIST.createAndUpdate, params);
    },

    async deleteDataService(params) {
        return axios.delete(APP_LIST.deleteData, { params });
    }
};

export default DestinationSubService;
