import axios from "configs/axios";

const APP_LIST = {
    getData: "/api/not-input-check-category/type-query",
};

const TypeQueryService = {
    async getData() {
        return axios.get(APP_LIST.getData);
    }
};

export default TypeQueryService;
