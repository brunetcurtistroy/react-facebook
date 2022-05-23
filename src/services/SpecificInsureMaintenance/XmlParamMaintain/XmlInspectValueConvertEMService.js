import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/xml-param-maintain/xml-inspect-value-convert-em",
    createAndUpdate: "/api/xml-param-maintain/xml-inspect-value-convert-em/save-and-update",
    deleteData: "/api/xml-param-maintain/xml-inspect-value-convert-em/delete"
};

const XmlInspectValueConvertEMService = {
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

export default XmlInspectValueConvertEMService;
