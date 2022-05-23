import axios from 'configs/axios';

const apiPaths = {
    getDataInputSupportPlanEtc: '/api/specific-health-tokuho-param-maintain/input-support-plan-etc',
    saveAndUpdateInputSupportPlanEtc: '/api/specific-health-tokuho-param-maintain/input-support-plan-etc/save-and-update',
    deleteInputSupportPlanEtc: '/api/specific-health-tokuho-param-maintain/input-support-plan-etc/delete',
};

const InputSupportPlanEtcService = {
    async getDataInputSupportPlanEtcService(params) {
        return axios.get(apiPaths.getDataInputSupportPlanEtc, {params});
    },
    async saveAndUpdateInputSupportPlanEtcService(params){
        return axios.post(apiPaths.saveAndUpdateInputSupportPlanEtc, params)
    },
    async deleteInputSupportPlanEtcService(params) {
        return axios.delete(apiPaths.deleteInputSupportPlanEtc, {params})
    }
};

export default InputSupportPlanEtcService;