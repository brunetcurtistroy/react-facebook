import AcquireSettingSubService from "services/CooperationRelated/PatientInfoCaptureScreen/AcquireSettingSubService"

export const getScreenDataAcquireSettingSubAction = (params) => {
    return AcquireSettingSubService.getScreenDataAcquireSettingSubService(params)
}

export const enterCAcquireSettingSubAction = (params) => {
    return AcquireSettingSubService.enterCAcquireSettingSubService(params)
}

export const updateBtnAcquireSettingSubAction = (params) => {
    return AcquireSettingSubService.updateBtnAcquireSettingSubService(params)
}