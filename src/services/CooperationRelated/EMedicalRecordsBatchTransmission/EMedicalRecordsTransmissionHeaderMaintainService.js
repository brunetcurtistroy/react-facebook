import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-header-maintain/get-screen-data",
    getListData: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-header-maintain/list-data",
    saveAndUpdate: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-header-maintain/save-data",
    deleteData: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-header-maintain/delete-data"
};

const EMedicalRecordsTransmissionHeaderMaintainService = {
    async getScreenData() {
        return axios.get(apiPaths.getScreenData);
    },

    async getListData() {
        return axios.get(apiPaths.getListData);
    },

    async saveAndUpdate(params) {
        return axios.put(apiPaths.saveAndUpdate, params);
    },

    async deleteData(params) {
        return axios.delete(apiPaths.deleteData, { params });
    }
};

export default EMedicalRecordsTransmissionHeaderMaintainService;
