import InspectListSettingSubService from "services/CooperationRelated/EMedicalRecordsInspectRequestMaintain/InspectListSettingSubService";

export const getScreenDataInspectListSettingSubAction = (params) => {
    return InspectListSettingSubService.getScreenDataInspectListSettingSubService(params)
}

export const getDataInspectListSettingSubAction = (params) => {
    return InspectListSettingSubService.getDataInspectListSettingSubService(params)
}

export const saveAndUpdateInspectListSettingSubAction = (params) => {
    return InspectListSettingSubService.saveAndUpdateInspectListSettingSubService(params)
}

export const deleteInspectListSettingSubAction = (params) => {
    return InspectListSettingSubService.deleteInspectListSettingSubService(params)
}

export const localAcquisitionInspectListSettingSubAction = (params) => {
    return InspectListSettingSubService.localAcquisitionInspectListSettingSubService(params)
}