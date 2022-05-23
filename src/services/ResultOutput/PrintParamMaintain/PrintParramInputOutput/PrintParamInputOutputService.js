import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/print-param-maintain/print-param-input-output/get-screen-data",
    runbtn: "/api/print-param-maintain/print-param-input-output/run-btn",
};
const PrintParamInputOutputService = {
    async getScreenData(params) {
        return axios.get(APP_LIST.getScreenData, {params});
    },
    async runbtn(params) {
        return axios.post(APP_LIST.runbtn, params, {responseType: 'blob'});
    },
};

export default PrintParamInputOutputService;
