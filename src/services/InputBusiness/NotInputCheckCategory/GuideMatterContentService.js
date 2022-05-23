import axios from 'configs/axios';

const apiPaths = {
    GetScreenData: '/api/not-input-check-category/overall-result-display-input/guide-matter-content/get-screen-data',
    Change_AutomaticJudgeBasicJudge: '/api/not-input-check-category/overall-result-display-input/guide-matter-content/change-automatic-judge-basic-judge',
    Change_Hide: '/api/not-input-check-category/overall-result-display-input/guide-matter-content/change-hide',
    Change_Lio_LeadershipMatters: '/api/not-input-check-category/overall-result-display-input/guide-matter-content/change-lio-leadership-matters',
    Exit: '/api/not-input-check-category/overall-result-display-input/guide-matter-content/exit'
};

const GuideMatterContentService = {
    async GetScreenData(params) {
        return axios.get(apiPaths.GetScreenData, {params});
    },
    async Change_AutomaticJudgeBasicJudge(params) {
        return axios.get(apiPaths.Change_AutomaticJudgeBasicJudge, {params});
    },
    async Change_Hide(params) {
        return axios.get(apiPaths.Change_Hide, {params});
    },
    async Change_Lio_LeadershipMatters(params) {
        return axios.get(apiPaths.Change_Lio_LeadershipMatters, {params});
    },
    async Exit(params) {
        return axios.post(apiPaths.Exit, params);
    },
};

export default GuideMatterContentService;