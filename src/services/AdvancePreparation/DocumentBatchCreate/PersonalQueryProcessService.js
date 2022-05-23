import axios from "configs/axios";

const APP_LIST = {
    GetListData: "/api/create-document-batch/personal-query-process", 
};

const PersonalQueryProcessService = {
    async GetListData(params) {
        return axios.get(APP_LIST.GetListData, {params});
    } 
};

export default PersonalQueryProcessService;
