import axios from 'configs/axios';

const apiPaths = {
    getScreenAcceptanceBatchProcess: '/api/acceptance-batch-process/acceptance-batch-process/get-screen-data',
    eventRetrievalAcceptanceBatchProcess: '/api/acceptance-batch-process/acceptance-batch-process/retrieval',
    eventAcceptOrCancelSubAcceptanceBatchProcess: '/api/acceptance-batch-process/acceptance-batch-process/accept-or-cancel-sub',
};


const AcceptanceBatchProcessService = {
    async getScreenAcceptanceBatchProcessService() {
        return axios.get(apiPaths.getScreenAcceptanceBatchProcess);
    },
    async eventRetrievalAcceptanceBatchProcessService(params) {
        return axios.post(apiPaths.eventRetrievalAcceptanceBatchProcess, params);
    },
    async eventAcceptOrCancelSubAcceptanceBatchProcessService(params) {
        return axios.post(apiPaths.eventAcceptOrCancelSubAcceptanceBatchProcess, params);
    },
};

export default AcceptanceBatchProcessService;