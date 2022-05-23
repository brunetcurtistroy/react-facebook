import axios from "configs/axios";

const APP_LIST = {
    getDataScreen: "/api/not-input-check-category/pattern-change/get-screen-data",
};

const PatternChangeService = {
    async getDataScreen() {
        return axios.get(APP_LIST.getDataScreen);
    }
};

export default PatternChangeService;
