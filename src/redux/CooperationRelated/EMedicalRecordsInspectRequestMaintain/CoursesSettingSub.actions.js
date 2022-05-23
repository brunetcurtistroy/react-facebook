import CoursesSettingSubService from "services/CooperationRelated/EMedicalRecordsInspectRequestMaintain/CoursesSettingSubService";

export const getScreenCoursesSettingSubAction = (params) => {
    return CoursesSettingSubService.getScreenCoursesSettingSubService(params)
}

export const getDataCoursesSettingSubAction = () => {
    return CoursesSettingSubService.getDataCoursesSettingSubService()
}

export const saveAndUpdateCoursesSettingSubAction = (params) => {
    return CoursesSettingSubService.saveAndUpdateCoursesSettingSubService(params)
}

export const deleteDataCoursesSettingSubAction = (params) => {
    return CoursesSettingSubService.deleteDataCoursesSettingSubService(params)
}

export const localAcquisitionCoursesSettingSubAction = () => {
    return CoursesSettingSubService.localAcquisitionCoursesSettingSubService()
}