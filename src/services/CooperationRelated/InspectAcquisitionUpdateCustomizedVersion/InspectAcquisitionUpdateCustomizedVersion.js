import axios from "configs/axios";

const apiPaths = {
    typeFile: '/api/inspect-acquisition-update-customized-version/inspect-acquisition-update-customized-version/get-screen-data',
    captureF12: "/api/inspect-acquisition-update-customized-version/inspect-acquisition-update-customized-version/capture-f12",
    captureF12Print: "/api/inspect-acquisition-update-customized-version/inspect-acquisition-update-customized-version/capture-f12-print",
    captureF12PrintAfter: "/api/inspect-acquisition-update-customized-version/inspect-acquisition-update-customized-version/capture-f12-print-after",
    printF11: '/api/inspect-acquisition-update-customized-version/inspect-acquisition-update-customized-version/print-f11',
    upload: '/api/file/upload'
};

const InspectAcquisitionUpdateCustomizedVersionService = {
    async captureF12(params) {
        return axios.post(apiPaths.captureF12, params );
    },

    async captureF12Print(params) {
        return axios.post(apiPaths.captureF12Print, params );
    },

    async captureF12PrintAfter(params) {
        return axios.post(apiPaths.captureF12PrintAfter, params );
    },

    async printF11(params) {
        return axios.post(apiPaths.printF11, params);
    },
    async getScreenData(params) {
        return axios.get(apiPaths.typeFile, { params});
    },
    async Upload(params) {
        return axios.post(apiPaths.upload, params);
    },
};

export default InspectAcquisitionUpdateCustomizedVersionService;