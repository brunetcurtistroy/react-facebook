import axios from 'configs/axios';

const apiPaths = {
    GetScreenData: '/api/not-input-check-category/not-input-check-category',
    StatusList: '/api/not-input-check-category/not-input-check-category/status-list',
    detailF7: '/api/not-input-check-category/not-input-check-category/details-btn-f07',
    detailF7After: '/api/not-input-check-category/not-input-check-category/details-btn-f07-after',
    Excel: '/api/not-input-check-category/not-input-check-category/excel',
    f10: '/api/not-input-check-category/not-input-check-category/open-f10'
};

const NotInputCheckCategoryService = {
    async GetScreenData(params) {
        return axios.get(apiPaths.GetScreenData, {params});
    },

    async StatusList(params) {
        return axios.get(apiPaths.StatusList, {params});
    },
    async f10(params) {
        return axios.get(apiPaths.f10, {params});
    },

    async detailF7(params) {
        return axios.post(apiPaths.detailF7, params);
    },

    async detailF7After(params) {
        return axios.post(apiPaths.detailF7After, params);
    },

    async ExportExcel(params) {
        return axios.post(apiPaths.Excel, params, {responseType: 'blob'});
    },
};

export default NotInputCheckCategoryService;
