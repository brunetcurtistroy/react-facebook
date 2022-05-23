import axios from "configs/axios";

const apiPaths = {
    getDataInspect: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-history/inspect/get-list-data",
    getDataImage: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-history/image/get-list-data"
};

const EMedicalRecordsTransmissionHistoryService = {
    async getDataInspect(params) {
        return axios.get(apiPaths.getDataInspect, {params});
    },

    async getDataImage(params) {
        return axios.get(apiPaths.getDataImage, {params});
    }
};

export default EMedicalRecordsTransmissionHistoryService;