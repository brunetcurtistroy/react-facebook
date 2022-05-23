import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/xml-param-maintain/item-convert-cd-maintain-e",
    createAndUpdate: "/api/xml-param-maintain/item-convert-cd-maintain-e/save-and-update",
    deleteData: "/api/xml-param-maintain/item-convert-cd-maintain-e/delete"
};

const ItemConvertCdMaintainEService = {
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

export default ItemConvertCdMaintainEService;
