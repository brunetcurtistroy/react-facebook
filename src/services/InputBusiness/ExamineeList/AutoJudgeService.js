import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/examinee-list/auto-judge/get-screen-data",
    yes_event: '/api/examinee-list/auto-judge/event-yes'
};

const AutoJudgeService = {
    async getScreenData(params) {
        return axios.get(apiPaths.getScreenData, { params });
    },

    async yes_event(params) {
        return axios.post(apiPaths.yes_event, params);
    }
};

export default AutoJudgeService;
