import axios from 'configs/axios';

const apiPaths = {
    getScreenSettingRomotoArticle52: '/api/romoto-article52/setting-romoto-article52',
    getDataSettingRomotoArticle52: '/api/romoto-article52/setting-romoto-article52/d01-content',
    saveAndUpdateSettingRomotoArticle52: '/api/romoto-article52/setting-romoto-article52/save',
    deleteSettingRomotoArticle52: '/api/romoto-article52/setting-romoto-article52/delete',
    saveDataSbufixSettingRomotoArticle52 : '/api/romoto-article52/setting-romoto-article52/save-task-subfix',
    getNameCategoryInspectCodeRomotoArticle52: '/api/romoto-article52/setting-romoto-article52/get-name-category-and-inspect-code',
};

const SettingRomotoArticle52Service = {
    async getScreenSettingRomotoArticle52Service() {
        return axios.get(apiPaths.getScreenSettingRomotoArticle52);
    },
    async saveDataSbufixSettingRomotoArticle52Service(params) {
        return axios.post(apiPaths.saveDataSbufixSettingRomotoArticle52, params);
    },
    async getDataSettingRomotoArticle52Service(params) {
        return axios.get(apiPaths.getDataSettingRomotoArticle52, { params });
    },
    async saveAndUpdateSettingRomotoArticle52Service(params) {
        return axios.post(apiPaths.saveAndUpdateSettingRomotoArticle52, params);
    },
    async deleteSettingRomotoArticle52Service(params) {
        return axios.delete(apiPaths.deleteSettingRomotoArticle52, { params });
    },
    async getNameCategoryInspectCodeRomotoArticle52Service(params) {
        return axios.get(apiPaths.getNameCategoryInspectCodeRomotoArticle52, { params });
    },
};

export default SettingRomotoArticle52Service;