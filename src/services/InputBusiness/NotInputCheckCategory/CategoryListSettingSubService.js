import axios from 'configs/axios';

const apiPaths = {
    GetListData: '/api/not-input-check-category/category-list-setting-sub',
    SaveListData: '/api/not-input-check-category/category-list-setting-sub/save-data',
    GetCategoryQuery: '/api/print-param-maintain/category-search-query-single',
};

const CategoryListSettingSubService = {
    async GetListData(params) {
        return axios.get(apiPaths.GetListData, {params});
    },
    async SaveListData(params) {
        return axios.post(apiPaths.SaveListData, params);
    },
    async GetCategorySearchQuery(params) {
        return axios.get(apiPaths.GetCategoryQuery, {params});
    },

};

export default CategoryListSettingSubService;