import axios from 'configs/axios';

const apiPaths = {
    ListData: '/api/not-input-check-category/overall-result-display-input/category-judge/notes-input',
    SaveData: '/api/not-input-check-category/overall-result-display-input/category-judge/notes-input/save-data',
    DeletData: '/api/not-input-check-category/overall-result-display-input/category-judge/notes-input/delete-data'
};

const NotesInputService = {
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

export default NotesInputService;