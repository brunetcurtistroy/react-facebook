import axios from 'configs/axios';

const apiPaths = {
    getScreenDataCourseBasicTypeSetting: '/api/course-basic-type-setting/course-basic-type-setting/get-screen-data',
    getCourseBasicTypeSetting: '/api/course-basic-type-setting/course-basic-type-setting',
    deleteCourseBasicTypeSetting: '/api/course-basic-type-setting/course-basic-type-setting/delete',
    EnableCourseBasicTypeSetting: '/api/course-basic-type-setting/course-basic-type-setting/enable-Course',
    DisableCourseBasicTypeSetting: '/api/course-basic-type-setting/course-basic-type-setting/disable-course'
};

const CourseBasicTypeSettingService = {
    async getScreenDataCourseBasicTypeSettingService() {
        return axios.get(apiPaths.getScreenDataCourseBasicTypeSetting);
    },
    async getCourseBasicTypeSettingService(params) {
        return axios.get(apiPaths.getCourseBasicTypeSetting, {params});
    },
    async deleteCourseBasicTypeSettingService(params){
        return axios.delete(apiPaths.deleteCourseBasicTypeSetting, {params})
    },
    async EnableCourseBasicTypeSettingService(params){
        return axios.post(apiPaths.EnableCourseBasicTypeSetting, params)
    },
    async DisableCourseBasicTypeSettingService(params){
        return axios.post(apiPaths.DisableCourseBasicTypeSetting, params)
    },
};

export default CourseBasicTypeSettingService;