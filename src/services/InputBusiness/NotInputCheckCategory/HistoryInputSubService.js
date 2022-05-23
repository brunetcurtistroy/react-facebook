import axios from 'configs/axios';

const apiPaths = {
    GetScreenData: '/api/not-input-check-category/history-input-sub/get-screen-data',
    ListData: '/api/not-input-check-category/history-input-sub/list-data',
    SaveData: '/api/not-input-check-category/history-input-sub/save-data',
    DeletData: '/api/not-input-check-category/history-input-sub/delete-data'
};

const HistoryInputSubService = {
    async GetScreenData(params) {
        return axios.get(apiPaths.GetScreenData, {params});
    },
    async ListData(params) {
        return axios.get(apiPaths.ListData, {params});
    },
    async DeletData(params) {
        return axios.delete(apiPaths.DeletData, {params});
    },
    async SaveData(params) {
        return axios.post(apiPaths.SaveData, params);
    },
};

export default HistoryInputSubService;