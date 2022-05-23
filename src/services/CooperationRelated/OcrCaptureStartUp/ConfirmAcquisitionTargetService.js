import axios from "configs/axios";

const apiPaths = {
    getListData: "/api/ocr-capture-start-up/confirm-acquisition-target",
    updateExec: "/api/ocr-capture-start-up/confirm-acquisition-target/update-exec",
};

const ConfirmAcquisitionTargetService = {
    async getListData(params) {
        return axios.get(apiPaths.getListData, { params });
    },

    async updateExec(params) {
        return axios.get(apiPaths.updateExec, { params });
    }
};

export default ConfirmAcquisitionTargetService;
