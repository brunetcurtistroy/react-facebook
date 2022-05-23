import axios from "configs/axios";

const APP_LIST = {
    getData: "/api/communication-roster-output/style-query",
};

const StyleQueryService = {
    async getData() {
        return axios.get(APP_LIST.getData);
    }
};

export default StyleQueryService;
