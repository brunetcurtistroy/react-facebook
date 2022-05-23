import axios from "configs/axios";

const APP_LIST = {
    execEvent: "/api/csv-create-param-maintain/param-input/exec",
};

const ParamInputService = {
    async execEvent(params) {
        return axios.post(APP_LIST.execEvent, params);
    }
};

export default ParamInputService;
