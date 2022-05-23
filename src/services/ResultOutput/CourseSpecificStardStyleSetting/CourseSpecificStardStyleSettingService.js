import axios from "configs/axios";

const API_LIST = {
  CourseSpecificStardStyleSetting:
    "/api/course-specific-stard-style-setting/course-specific-stard-style-setting",
  SaveAndUpdateCourseSpecificStardStyleSetting:
    "/api/course-specific-stard-style-setting/course-specific-stard-style-setting/save-and-update",
  DeleteCourseSpecificStardStyleSetting:
    "/api/course-specific-stard-style-setting/course-specific-stard-style-setting/delete",
  CaptureF09CourseSpecificStardStyleSetting:
    "/api/course-specific-stard-style-setting/course-specific-stard-style-setting/course-capture-f09",
  ChangeOfficeCodeCourseSpecificStardStyleSetting:
    "/api/course-specific-stard-style-setting/course-specific-stard-style-setting/change-office-code",
  ChangeMedicalExamCourseCourseSpecificStardStyleSetting:
    "/api/course-specific-stard-style-setting/course-specific-stard-style-setting/change-medical-exam-course",
  ChangeStandardPrintingStyleCourseSpecificStardStyleSetting:
    "/api/course-specific-stard-style-setting/course-specific-stard-style-setting/change-standard-printing-style",
    
};


const CourseSpecificStardStyleSettingService = {
  async getCourseSpecificStardStyleSettingService() {
    return axios.get(API_LIST.CourseSpecificStardStyleSetting);
  },
  async saveAndUpdateCourseSpecificStardStyleSettingService(params) {
    return axios.post(
      API_LIST.SaveAndUpdateCourseSpecificStardStyleSetting,
      params
    );
  },
  async deleteCourseSpecificStardStyleSettingService(params) {
    return axios.delete(API_LIST.DeleteCourseSpecificStardStyleSetting, {
      params,
    });
  },
  async captureF09CourseSpecificStardStyleSettingService() {
    return axios.post(API_LIST.CaptureF09CourseSpecificStardStyleSetting);
  },
  async ChangeOfficeCodeCourseSpecificStardStyleSetting(params) {
    return axios.get(API_LIST.ChangeOfficeCodeCourseSpecificStardStyleSetting,{params});
  },
  async ChangeMedicalExamCourseCourseSpecificStardStyleSetting(params) {
    return axios.get(API_LIST.ChangeMedicalExamCourseCourseSpecificStardStyleSetting,{params});
  },
  async ChangeStandardPrintingStyleCourseSpecificStardStyleSetting(params) {
    return axios.get(API_LIST.ChangeStandardPrintingStyleCourseSpecificStardStyleSetting,{params});
  },
};

export default CourseSpecificStardStyleSettingService;
