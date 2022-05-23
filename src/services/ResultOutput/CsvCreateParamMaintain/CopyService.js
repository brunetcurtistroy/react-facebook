import axios from "configs/axios";

const APP_LIST = {
    // 0460008
    getScreenData: "/api/csv-create-param-maintain/copy_WS0460008",
    copyData: "/api/csv-create-param-maintain/copy_WS0460008/f12",
    //WS0454005
    CopyRegister: "/api/csv-create-param-maintain/copy_WS0454005",
};

const CopyService = {
    // 0460008
    async getScreenData(params) {
        return axios.get(APP_LIST.getScreenData, {params});
    },
    async copyData(params) {
        return axios.post(APP_LIST.copyData, params);
    },
    async CopyRegister(params) {
        return axios.post(APP_LIST.CopyRegister, params);
    }
};


export default CopyService;
