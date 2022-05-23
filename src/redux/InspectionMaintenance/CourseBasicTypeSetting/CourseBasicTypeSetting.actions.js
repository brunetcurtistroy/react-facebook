import CourseBasicTypeSettingService from "services/InspectionMaintenance/CourseBasicTypeSetting/CourseBasicTypeSettingService";

export const getScreenDataCourseBasicTypeSettingAction = (params) => {
    return CourseBasicTypeSettingService.getScreenDataCourseBasicTypeSettingService(params)
}

export const getCourseBasicTypeSettingAction = (params) => {
    return CourseBasicTypeSettingService.getCourseBasicTypeSettingService(params)
}

export const deleteCourseBasicTypeSettingAction = (params) => {
    return CourseBasicTypeSettingService.deleteCourseBasicTypeSettingService(params)
}

export const EnableCourseBasicTypeSettingAction = (params) => {
    return CourseBasicTypeSettingService.EnableCourseBasicTypeSettingService(params)
}

export const DisableCourseBasicTypeSettingAction = (params) => {
    return CourseBasicTypeSettingService.DisableCourseBasicTypeSettingService(params)
}
