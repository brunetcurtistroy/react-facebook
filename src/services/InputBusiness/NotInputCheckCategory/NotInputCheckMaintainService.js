import axios from 'configs/axios';

const apiPaths = {
    patternF8: '/api/not-input-check-category/not-input-check-maintain/pattern-f08',
    GetTreeData: '/api/not-input-check-category/not-input-check-maintain',
    ClickData: '/api/not-input-check-category/not-input-check-maintain/click',
    GenerateData: '/api/not-input-check-category/not-input-check-maintain/generate-data',
    SaveTypeMaintenance: '/api/not-input-check-category/not-input-check-maintain/type-maintenance/save-data',
    TypeMaintenance: '/api/not-input-check-category/not-input-check-maintain/type-maintenance',
    CategoryDisplayMaintaince: '/api/not-input-check-category/not-input-check-maintain/catgerogy-display-maintance',
    SaveCategoryDisplayMaintaince: '/api/not-input-check-category/not-input-check-maintain/catgerogy-display-maintance/save-data',
    UnnecessaryExamList: '/api/not-input-check-category/not-input-check-maintain/unnecessary-exam-list',
    SaveUnnecessaryExamList: '/api/not-input-check-category/not-input-check-maintain/unnecessary-exam-list/save-data',
    DeleteDataUnnecessaryExamList: '/api/not-input-check-category/not-input-check-maintain/unnecessary-exam-list/delete-data',
    DeleteTypeMaintenanceByCode: '/api/not-input-check-category/not-input-check-maintain/type-maintenance/delete-data'
};

const NotInputCheckMaintainService = {
    async GetTreeData(params) {
        return axios.get(apiPaths.GetTreeData, { params });
    },
    async ClickData(params) {
        return axios.get(apiPaths.ClickData, { params });
    },
    async GenerateData(params) {
        return axios.get(apiPaths.GenerateData, { params });
    },
    async SaveTypeMaintenance(params) {
        return axios.post(apiPaths.SaveTypeMaintenance, params);
    },
    async TypeMaintenance(params) {
        return axios.get(apiPaths.TypeMaintenance, { params });
    },
    async CategoryDisplayMaintaince(params) {
        return axios.get(apiPaths.CategoryDisplayMaintaince, { params });
    },
    async SaveCategoryDisplayMaintaince(params) {
        return axios.post(apiPaths.SaveCategoryDisplayMaintaince, params);
    },
    async UnnecessaryExamList(params) {
        return axios.get(apiPaths.UnnecessaryExamList, { params });
    },
    async SaveUnnecessaryExamList(params) {
        return axios.post(apiPaths.SaveUnnecessaryExamList, params );
    },
    async DeleteDataUnnecessaryExamList(params) {
        return axios.delete(apiPaths.DeleteDataUnnecessaryExamList, {params} );
    },
    async DeleteTypeMaintenanceByCode(params) {
        return axios.delete(apiPaths.DeleteTypeMaintenanceByCode, {params} );
    },
    async patternF8(params) {
        return axios.post(apiPaths.patternF8, params );
    },
};

export default NotInputCheckMaintainService;