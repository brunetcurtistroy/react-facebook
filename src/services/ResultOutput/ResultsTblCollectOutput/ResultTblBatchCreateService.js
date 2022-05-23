import axios from "configs/axios";

const apiPaths = {
    getDataScreen: "/api/results-tbl-collect-output/result-tbl-batch-create/get-screen-data",
    extract_F11: "/api/results-tbl-collect-output/result-tbl-batch-create/extract-f11",
    choice: "/api/results-tbl-collect-output/result-tbl-batch-create/choice",
    select_one: "/api/results-tbl-collect-output/result-tbl-batch-create/seletct-issuing",
    select_all: "/api/results-tbl-collect-output/result-tbl-batch-create/seletct-all",
    print_F12: "/api/results-tbl-collect-output/result-tbl-batch-create/print-f12",

    getNameOffice: "/api/results-tbl-collect-output/result-tbl-batch-create/getname-gofficecd",
    getNameKanshocd: "/api/results-tbl-collect-output/result-tbl-batch-create/getname-kanshocd",
    getNameType: "/api/results-tbl-collect-output/result-tbl-batch-create/getname-gformtype",
};

const ResultTblBatchCreateService = {
    async getDataScreen(params) {
        return axios.get(apiPaths.getDataScreen, { params });
    },

    async extract_F11(params) {
        return axios.get(apiPaths.extract_F11, { params });
    },

    async choice(params) {
        return axios.get(apiPaths.choice, { params });
    },

    async select_one(params) {
        return axios.get(apiPaths.select_one, { params });
    },

    async select_all(params) {
        return axios.get(apiPaths.select_all, { params });
    },

    async print_F12(params) {
        return axios.get(apiPaths.print_F12, { params, responseType: 'blob'});
    },

    async getNameOffice(params) {
        return axios.get(apiPaths.getNameOffice, { params });
    },

    async getNameKanshocd(params) {
        return axios.get(apiPaths.getNameKanshocd, { params });
    },

    async getNameType(params) {
        return axios.get(apiPaths.getNameType, { params });
    }
};

export default ResultTblBatchCreateService;
