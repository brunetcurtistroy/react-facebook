import axios from "configs/axios";

const API_LIST = {
  ChangeNameCourse:
    "/api/reserves-display-item-setting/display-name-edit/change-name-course",
  ChangeNameInspect:
    "/api/reserves-display-item-setting/display-name-edit/change-name-inspect",
};

const DisplayNameEditService = {
  async changeChangeNameCourseService(params) {
    return axios.post(API_LIST.ChangeNameCourse, params);
  },
  async changeChangeNameInspectService(params) {
    return axios.post(API_LIST.ChangeNameInspect, params);
  },
};

export default DisplayNameEditService;
