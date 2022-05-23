import axios from 'configs/axios';

const apiPaths = {
    getInspectRequestConvertMasterMaintain: '/api/inspect-request-convert-master-maintain/inspect-request-convert-master-maintain',
    saveAndUpdateInspectRequestConvertMasterMaintain: '/api/inspect-request-convert-master-maintain/inspect-request-convert-master-maintain/save-and-update',
    deleteInspectRequestConvertMasterMaintain: '/api/inspect-request-convert-master-maintain/inspect-request-convert-master-maintain/delete',
};

const InspectRequestConvertMasterMaintainService = {
    async getInspectRequestConvertMasterMaintainService(params) {
        return axios.get(apiPaths.getInspectRequestConvertMasterMaintain, {params});
    },
    async saveAndUpdateInspectRequestConvertMasterMaintainService(params){
        return axios.post(apiPaths.saveAndUpdateInspectRequestConvertMasterMaintain, params)
    },
    async deleteInspectRequestConvertMasterMaintainService(params){
        return axios.delete(apiPaths.deleteInspectRequestConvertMasterMaintain, {params})
    },
};

export default InspectRequestConvertMasterMaintainService;