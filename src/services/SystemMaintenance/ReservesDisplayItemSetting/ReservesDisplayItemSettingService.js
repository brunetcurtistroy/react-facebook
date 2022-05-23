import axios from "configs/axios";

const API_LIST = {
  //API 788.1
  DisplayItemCourse:
    "/api/reserves-display-item-setting/reserves-display-item-setting/display-item-course",
  //API 788.2
  DisplayItemInspect:
    "/api/reserves-display-item-setting/reserves-display-item-setting/display-item-inspect",
  //API 788.3
  LeftCoursesWhole:
    "/api/reserves-display-item-setting/reserves-display-item-setting/left-courses-whole",
  //API 788.4
  RightCoursesDisplayItems:
    "/api/reserves-display-item-setting/reserves-display-item-setting/right-courses-display-items",
  //API 788.5
  LeftExamListWhole:
    "/api/reserves-display-item-setting/reserves-display-item-setting/left-exam-list-whole",
  //API 788.6
  RightExamListDisplayItems:
    "/api/reserves-display-item-setting/reserves-display-item-setting/right-exam-list-display-items",
  //API 788.7
  CourseAdded:
    "/api/reserves-display-item-setting/reserves-display-item-setting/course-added",
  //API 788.8
  CourseDelete:
    "/api/reserves-display-item-setting/reserves-display-item-setting/course-delete",
  //API 788.9
  AddInspect:
    "/api/reserves-display-item-setting/reserves-display-item-setting/add-inspect",
  //API 788.10
  DeleteCheck:
    "/api/reserves-display-item-setting/reserves-display-item-setting/delete-check",
};

const ReservesDisplayItemSettingService = {
  //API 788.1
  async getDisplayItemCourseService() {
    return axios.get(API_LIST.DisplayItemCourse);
  },
  //API 788.2
  async getDisplayItemInspectService() {
    return axios.get(API_LIST.DisplayItemInspect);
  },
  //API 788.3
  async getLeftCoursesWholeService(params) {
    return axios.get(API_LIST.LeftCoursesWhole, { params });
  },
  //API 788.4
  async getRightCoursesDisplayItemsService(params) {
    return axios.get(API_LIST.RightCoursesDisplayItems, { params });
  },
  //API 788.5
  async getLeftExamListWholeService(params) {
    return axios.get(API_LIST.LeftExamListWhole, { params });
  },
  //API 788.6
  async getRightExamListDisplayItemsService(params) {
    return axios.get(API_LIST.RightExamListDisplayItems, { params });
  },
  //API 788.7
  async addCourseAddedService(params) {
    return axios.post(API_LIST.CourseAdded, params);
  },
  //API 788.8
  async deleteCourseDeleteService(params) {
    return axios.delete(API_LIST.CourseDelete, { params });
  },
  //API 788.9
  async addInspectService(params) {
    return axios.post(API_LIST.AddInspect, params);
  },
  //API 788.10
  async deleteCheckService(params) {
    return axios.delete(API_LIST.DeleteCheck, { params });
  },
};

export default ReservesDisplayItemSettingService;
