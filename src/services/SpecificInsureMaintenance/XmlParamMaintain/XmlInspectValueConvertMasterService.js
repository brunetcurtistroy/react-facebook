import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/xml-param-maintain/xml-inspect-value-convert-master",
    createAndUpdate: "/api/xml-param-maintain/xml-inspect-value-convert-master/save-and-update",
    deleteData: "/api/xml-param-maintain/xml-inspect-value-convert-master/delete"
};

const XmlInspectValueConvertMasterService = {
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

export default XmlInspectValueConvertMasterService;
