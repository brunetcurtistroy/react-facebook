import MiraisSingleTransmissionService from "services/CooperationRelated/MiraisSingleTransmission/MiraisSingleTransmissionService";

export const getScreenDataMiraisSingleTransmissionAction = (params) => {
    return MiraisSingleTransmissionService.getScreenDataMiraisSingleTransmissionService(params)
}

export const getListDataMiraisSingleTransmissionAction = (params) => {
    return MiraisSingleTransmissionService.getListDataMiraisSingleTransmissionService(params)
}

export const modifyDataMiraisSingleTransmissionAction = (params) => {
    return MiraisSingleTransmissionService.modifyDataMiraisSingleTransmissionService(params)
}

export const submitBtnMiraisSingleTransmissionAction = (params) => {
    return MiraisSingleTransmissionService.SubmitBtnMiraisSingleTransmissionService(params)
}

export const submitBtnBeforeMiraisSingleTransmissionAction = (params) => {
    return MiraisSingleTransmissionService.SubmitBtnBeforeMiraisSingleTransmissionService(params)
}

export const extractBtnMiraisSingleTransmissionAction = (params) => {
    return MiraisSingleTransmissionService.ExtractBtnMiraisSingleTransmissionService(params)
}

export const destroyMiraisSingleTransmissionAction = (params) => {
    return MiraisSingleTransmissionService.destroyMiraisSingleTransmissionService(params)
}