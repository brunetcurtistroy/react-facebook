import axios from 'configs/axios';

const apiPaths = {
    getListDataConsultHistorySub: '/api/progress-setting/consult-history-sub/get-list',
};

const ConsultHistorySubService = {
    async getListDataConsultHistorySubService(params) {
        return axios.get(apiPaths.getListDataConsultHistorySub, {params});
    },
};

export default ConsultHistorySubService;