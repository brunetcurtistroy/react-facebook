import axios from 'configs/axios';

const apiPaths = {
    getCategoryMasterMaintain: '/api/category-master-maintain/category-master-maintain',
    getSiteFindings: '/api/category-master-maintain/category-master-maintain/site-findings',
    saveAndUpdateCategoryMasterMaintain: '/api/category-master-maintain/category-master-maintain/save-and-update',
    deleteCategoryMasterMaintain: '/api/category-master-maintain/category-master-maintain/delete',
    deleteOpinionCategoryMasterMaintain: '/api/category-master-maintain/category-master-maintain/delete-opinion',
    deletePartCategorMasterMaintain: '/api/category-master-maintain/category-master-maintain/delete-part',
    updateOrCreatePartCategoryMasterMaintain: '/api/category-master-maintain/category-master-maintain/save-and-update-part',
    updateOrCreateOpinionCategoryMasterMaintain: '/api/category-master-maintain/category-master-maintain/save-and-update-opinion',
    eventF7CategoryMasterMaintain: '/api/category-master-maintain/category-master-maintain/f7'
};

const CategoryMasterMaintainService = {
    async getCategoryMasterMaintainService(params) {
        return axios.get(apiPaths.getCategoryMasterMaintain, {params});
    },
    async getSiteFindingsService(params) {
        return axios.get(apiPaths.getSiteFindings, {params});
    },
    async saveAndUpdateCategoryMasterMaintainService(params){
        return axios.post(apiPaths.saveAndUpdateCategoryMasterMaintain, params)
    },
    async deleteCategoryMasterMaintainService(params){
        return axios.delete(apiPaths.deleteCategoryMasterMaintain, {params})
    },
    async deleteOpinionCategoryMasterMaintainService(params){
        return axios.delete(apiPaths.deleteOpinionCategoryMasterMaintain, {params})
    },
    async deletePartCategorMasterMaintainService(params){
        return axios.delete(apiPaths.deletePartCategorMasterMaintain, {params})
    },
    async updateOrCreatePartCategoryMasterMaintainService(params){
        return axios.post(apiPaths.updateOrCreatePartCategoryMasterMaintain, params)
    },
    async updateOrCreateOpinionCategoryMasterMaintainService(params){
        return axios.post(apiPaths.updateOrCreateOpinionCategoryMasterMaintain, params)
    },
    async eventF7CategoryMasterMaintainService(params){
        return axios.post(apiPaths.eventF7CategoryMasterMaintain, params)
    },
};

export default CategoryMasterMaintainService;