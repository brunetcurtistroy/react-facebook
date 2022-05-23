import axios from 'configs/axios';

const apiPaths = {
    getListDataPatientInfoQueryStard: '/api/personal-info-maintain-directly/patient-info-query-stard',
    deleteDataPatientInfoQueryStard:  '/api/personal-info-maintain-directly/patient-info-query-stard/delete',
};

const PatientInfoQueryStardService = {
    async getListDataPatientInfoQueryStardService(params) {
        return axios.get(apiPaths.getListDataPatientInfoQueryStard, {params});
    },
    async deleteDataPatientInfoQueryStardService(params) {
        return axios.delete(apiPaths.deleteDataPatientInfoQueryStard, {params});
    },
};

export default PatientInfoQueryStardService;