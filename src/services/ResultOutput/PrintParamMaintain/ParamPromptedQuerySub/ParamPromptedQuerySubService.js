import axios from "configs/axios";

const APP_LIST = {
    getScreenData: "/api/print-param-maintain/param-prompted-query-sub/get-screen-data",
    InstructDivisionQuerySub: "/api/print-param-maintain/param-prompted-query-sub/instruct-division-query-sub",
};
const ParamPromptedQuerySubService = {
    async getScreenData(params) {
        return axios.get(APP_LIST.getScreenData,{ params });
    },
    async InstructDivisionQuerySub(formData) {
        return axios.post(APP_LIST.InstructDivisionQuerySub, formData);
    },
};

export default ParamPromptedQuerySubService;