import axios from 'configs/axios';

const apiPaths = {
    getDataPatternSettingSub: '/api/another-inspect-item-setting-category/another-inspect-item-setting-category/pattern-setting-sub',
    saveDataPatternSettingSub: '/api/another-inspect-item-setting-category/another-inspect-item-setting-category/pattern-setting-sub/create-or-update',
    deleteDataPatternSettingSub: '/api/another-inspect-item-setting-category/another-inspect-item-setting-category/pattern-setting-sub/delete',
};

const PatternSettingSubService = {
    async getDataPatternSettingSubService() {
        return axios.get(apiPaths.getDataPatternSettingSub);
    },
    async saveDataPatternSettingSubService(params) {
        return axios.put(apiPaths.saveDataPatternSettingSub, params);
    },
    async deleteDataPatternSettingSubService(params){
        return axios.delete(apiPaths.deleteDataPatternSettingSub, {params})
    },
};

export default PatternSettingSubService;