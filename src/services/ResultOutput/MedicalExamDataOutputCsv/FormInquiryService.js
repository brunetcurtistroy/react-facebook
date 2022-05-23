import axios from "configs/axios";

const APP_LIST = {
    GetScreenData: "/api/medical-exam-data-output-csv/form-inquiry",
};

const FormInquiryService = {
    async GetScreenData(params) {
        return axios.get(APP_LIST.GetScreenData, {params});
    },

};

export default FormInquiryService;