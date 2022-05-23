import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/e-medical-records-batch-transmission/e-medical-records-course-basic-type-setting/get-screen-data",
    getDataTable: "/api/e-medical-records-batch-transmission/e-medical-records-course-basic-type-setting/get-list-data",
    getDataContractInfo: "/api/e-medical-records-batch-transmission/e-medical-records-course-basic-type-setting/contract-info-list",
    createAndUpdate: "/api/e-medical-records-batch-transmission/e-medical-records-course-basic-type-setting/save-data",
    delete: "/api/e-medical-records-batch-transmission/e-medical-records-course-basic-type-setting/delete-data"
};

const EMedicalRecordsCourseBasicTypeSettingService = {
    async getScreenData() {
        return axios.get(apiPaths.getScreenData);
    },

    async getDataTable() {
        return axios.get(apiPaths.getDataTable);
    },

    async getDataContractInfo(params) {
        return axios.get(apiPaths.getDataContractInfo, { params });
    },

    async createAndUpdate(params) {
        return axios.post(apiPaths.createAndUpdate, params);
    },

    async delete(params) {
        return axios.delete(apiPaths.delete, { params });
    }
};

export default EMedicalRecordsCourseBasicTypeSettingService;