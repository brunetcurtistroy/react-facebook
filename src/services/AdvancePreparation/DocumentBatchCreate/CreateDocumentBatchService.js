import axios from "configs/axios";

const APP_LIST = {
    GetScreenData: "/api/create-document-batch/create-document-batch/get-screen-data",
    DisplayBtn: "/api/create-document-batch/create-document-batch/display-btn", 
    change: "/api/create-document-batch/create-document-batch/get-name-office-code"
};

const CreateDocumentBatchService = {
    async GetScreenData(params) {
        return axios.get(APP_LIST.GetScreenData, {params});
    },
    async DisplayBtn(params) {
        return axios.post(APP_LIST.DisplayBtn, params);
    }, 
    async change(params) {
        return axios.get(APP_LIST.change, {params});
    }, 
};

export default CreateDocumentBatchService;