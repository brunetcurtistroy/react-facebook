import axios from "configs/axios";

const apiList = {
    getScreenCoursesSettingSub: '/api/e-medical-records-inspect-request-maintain/courses-setting-sub/get-screen-data',
    getDataCoursesSettingSub: "/api/e-medical-records-inspect-request-maintain/courses-setting-sub",
    saveAndUpdateCoursesSettingSub: '/api/e-medical-records-inspect-request-maintain/courses-setting-sub/save-and-update',
    deleteDataCoursesSettingSub: '/api/e-medical-records-inspect-request-maintain/courses-setting-sub/delete',
    localAcquisitionCoursesSettingSub: '/api/e-medical-records-inspect-request-maintain/courses-setting-sub/local-acquisition',
};

const CoursesSettingSubService = {
    async getScreenCoursesSettingSubService(params) {
        return axios.get(apiList.getScreenCoursesSettingSub, {params});
    },
    async getDataCoursesSettingSubService() {
        return axios.get(apiList.getDataCoursesSettingSub);
    },
    async saveAndUpdateCoursesSettingSubService(params) {
        return axios.post(apiList.saveAndUpdateCoursesSettingSub, params);
    },
    async deleteDataCoursesSettingSubService(params) {
        return axios.delete(apiList.deleteDataCoursesSettingSub, {params});
    },
    async localAcquisitionCoursesSettingSubService() {
        return axios.get(apiList.localAcquisitionCoursesSettingSub);
    },
};

export default CoursesSettingSubService;