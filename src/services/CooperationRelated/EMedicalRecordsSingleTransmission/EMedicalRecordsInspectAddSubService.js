import axios from "configs/axios";

const API_LIST = {
    confirmButtonEMedicalRecordsInspectAddSub: '/api/e-medical-records-single-transmission/e-medical-records-inspect-add-sub/confirm',
    getScreenDataMedicalRecordsInspectAddSub: '/api/e-medical-records-single-transmission/e-medical-records-inspect-add-sub/get-screen-data',
    ChangeInspectCodeMedicalRecordsInspectAddSubAction: '/api/e-medical-records-single-transmission/e-medical-records-inspect-add-sub/change-inspect-code',
};

const EMedicalRecordsInspectAddSubService = {
    async confirmButtonEMedicalRecordsInspectAddSubService(params) {
        return axios.post(API_LIST.confirmButtonEMedicalRecordsInspectAddSub, params);
    },
    async getScreenDataMedicalRecordsInspectAddSubService(params) {
        return axios.get(API_LIST.getScreenDataMedicalRecordsInspectAddSub, {params});
    },
    async ChangeInspectCodeMedicalRecordsInspectAddSubAction(params) {
        return axios.get(API_LIST.ChangeInspectCodeMedicalRecordsInspectAddSubAction, {params});
    },
};
export default EMedicalRecordsInspectAddSubService;