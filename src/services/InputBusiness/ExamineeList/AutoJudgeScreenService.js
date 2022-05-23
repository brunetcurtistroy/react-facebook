import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/examinee-list/auto-judge-screen/get-screen-data",
    event_Exec: "/api/examinee-list/auto-judge-screen/exec",
};

const AutoJudgeScreenService = {
    async getScreenData(params) {
        return axios.get(apiPaths.getScreenData, { params });
    },

    async event_Exec(params) {
        return axios.post(apiPaths.event_Exec, params);
    }
};

export default AutoJudgeScreenService;
