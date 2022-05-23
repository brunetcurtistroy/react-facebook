import axios from "configs/axios";

const APP_LIST = {
    GetScreenData: "/api/medical-exam-data-output-csv/medical-exam-data-output-csv/get-screen-data",
    GetListDataF11: "/api/medical-exam-data-output-csv/medical-exam-data-output-csv/f11",
    OutputF12: '/api/medical-exam-data-output-csv/medical-exam-data-output-csv/f12',
    Downloadfile: '/api/medical-exam-data-output-csv/medical-exam-data-output-csv/download', 
    AllSelect: "/api/medical-exam-data-output-csv/medical-exam-data-output-csv/all-select",
    GformType: '/api/medical-exam-data-output-csv/medical-exam-data-output-csv/get-info-gform-type',
    GtubePalm: '/api/medical-exam-data-output-csv/medical-exam-data-output-csv/get-info-gtube-palm',
    Goffice: '/api/medical-exam-data-output-csv/medical-exam-data-output-csv/get-info-goffice',
    ConditionNum: '/api/medical-exam-data-output-csv/medical-exam-data-output-csv/get-info-condition-num'
};

const MedicalExamDataOutputCsvService = {
    async GetGformType(params) {
        return axios.get(APP_LIST.GformType, {params});
    },
    async GetGtubePalm(params) {
        return axios.get(APP_LIST.GtubePalm, {params});
    },
    async GetGoffice(params) {
        return axios.get(APP_LIST.Goffice, {params});
    },
    async GetConditionNum(params) {
        return axios.get(APP_LIST.ConditionNum, {params});
    },
    async GetScreenData(params) {
        return axios.get(APP_LIST.GetScreenData, {params});
    },
    async GetListDataF11(params) {
        return axios.get(APP_LIST.GetListDataF11, {params});
    },
    async OutputF12(params) {
        return axios.post(APP_LIST.OutputF12, params);
    },
    async Downloadfile(params) {
        return axios.post(APP_LIST.Downloadfile, params);
    },
    async AllSelect(params) {
        return axios.post(APP_LIST.AllSelect, params);
    },
};

export default MedicalExamDataOutputCsvService;