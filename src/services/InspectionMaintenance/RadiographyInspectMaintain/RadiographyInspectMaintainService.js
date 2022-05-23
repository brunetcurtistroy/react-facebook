import axios from 'configs/axios';

const apiPaths = {
    deleteRadioGraphyInspectMaintain: '/api/radio-graphy-inspect-maintain/radio-graphy-inspect-maintain/delete',
    getRadioGraphyInspectMaintain: '/api/radio-graphy-inspect-maintain/radio-graphy-inspect-maintain',
    saveAndUpdateRadioGraphyInspectMaintain: '/api/radio-graphy-inspect-maintain/radio-graphy-inspect-maintain/save-and-update',
};

const RadiographyInspectMaintainService = {
    async getRadioGraphyInspectMaintainService() {
        return axios.get(apiPaths.getRadioGraphyInspectMaintain);
    },
    async deleteRadioGraphyInspectMaintainService(params) {
        return axios.delete(apiPaths.deleteRadioGraphyInspectMaintain, {params});
    },
    async saveAndUpdateRadioGraphyInspectMaintainService(params){
        return axios.post(apiPaths.saveAndUpdateRadioGraphyInspectMaintain, params)
    },
};

export default RadiographyInspectMaintainService;