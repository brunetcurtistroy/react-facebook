import axios from 'configs/axios';

const apiPaths = {
    getCommentGroupCbx: '/api/condition-express-cmt-setting/condition-express-cmt-setting/get-screen-data',
    getDataTeachChingItemList: '/api/condition-express-cmt-setting/condition-express-cmt-setting/teach-ching-item-list/get-screen-data',
    updateTeachChingItemList: '/api/condition-express-cmt-setting/condition-express-cmt-setting/teach-ching-item-list/update',
    deleteDate: '/api/condition-express-cmt-setting/condition-express-cmt-setting/teach-ching-item-list/delete',
};

const ConditionExpressCmtSettingService = {
    async getCommentGroupCbxService() {
        return axios.get(apiPaths.getCommentGroupCbx);
    },

    async getDataTeachChingItemListService(params) {
        return axios.get(apiPaths.getDataTeachChingItemList, { params });
    },

    async updateTeachChingItemListService(params) {
        return axios.put(apiPaths.updateTeachChingItemList, params)
    },

    async deleteDateService(params) {
        return axios.delete(apiPaths.deleteDate, {params})
    }
};

export default ConditionExpressCmtSettingService;