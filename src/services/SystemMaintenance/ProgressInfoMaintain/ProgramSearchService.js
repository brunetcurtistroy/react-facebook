import axios from 'configs/axios';

const apiPaths = {
    getScreenListDataProgramSearch: '/api/progress-info-maintain/program-search/get-list-data',
};

const ProgramSearchService = {
    async getScreenListDataProgramSearchService(params) {
        return axios.get(apiPaths.getScreenListDataProgramSearch, {params});
    },
};

export default ProgramSearchService;