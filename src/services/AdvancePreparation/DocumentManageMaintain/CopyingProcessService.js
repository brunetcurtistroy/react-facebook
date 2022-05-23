import axios from "configs/axios";

const APP_LIST = {
    copyData: "/api/document-manage-maintain/copying-process/enter-c",
};

const CopyingProcessService = {
    async copyData(params) {
        return axios.post(APP_LIST.copyData, params);
    }
};

export default CopyingProcessService;
