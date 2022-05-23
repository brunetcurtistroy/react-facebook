import axios from 'configs/axios';

const apiPaths = {
    GetListData: '/api/binding-mode-setting/condition-info-maintain/get-list-data',
    Paste: '/api/binding-mode-setting/condition-info-maintain/paste',
    Details: '/api/binding-mode-setting/condition-info-maintain/details',
    DeleteParent: '/api/binding-mode-setting/condition-info-maintain/delete-parent',
    DeleteDetail: '/api/binding-mode-setting/condition-info-maintain/delete-detail',
    CreateParent: '/api/binding-mode-setting/condition-info-maintain/create-parent',
    SaveDetail: '/api/binding-mode-setting/condition-info-maintain/save-detail',
};

const ConditionInfoMaintainService = {
    async GetListData(params) {
        return axios.get(apiPaths.GetListData, {params});
    },
    async Paste(params) {
        return axios.get(apiPaths.Paste, {params});
    },
    async Details(params) {
        return axios.get(apiPaths.Details, {params});
    },
    async DeleteDetail(params) {
        return axios.delete(apiPaths.DeleteDetail, {params});
    },
    async DeleteParent(params) {
        return axios.delete(apiPaths.DeleteParent, {params});
    },
    async CreateParent(params) {
        return axios.post(apiPaths.CreateParent, params);
    },
    async SaveDetail(params) {
        return axios.post(apiPaths.SaveDetail, params);
    },
};

export default ConditionInfoMaintainService;
