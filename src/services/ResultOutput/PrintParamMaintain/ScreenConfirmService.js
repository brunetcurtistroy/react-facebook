import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/print-param-maintain/screen-confirm",
};
const ScreenConfirmService = {
    async getScreenData(params) {
        return axios.get(APP_LIST.getScreenData, {params});
    },
};

export default ScreenConfirmService;