import axios from 'configs/axios';

const apiPaths = {
    getDataJudgeSelect: '/api/romoto-article52/judge-select',
};

const JudgeSelectService = {
    async getDataJudgeSelectService(params) {
        return axios.get(apiPaths.getDataJudgeSelect, {params});
    },
};

export default JudgeSelectService;