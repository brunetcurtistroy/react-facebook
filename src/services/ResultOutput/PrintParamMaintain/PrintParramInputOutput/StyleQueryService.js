import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/print-param-maintain/style-query-863",
};
const StyleQueryService = {
    async getScreenData() {
        return axios.get(APP_LIST.getScreenData);
    },
};

export default StyleQueryService;