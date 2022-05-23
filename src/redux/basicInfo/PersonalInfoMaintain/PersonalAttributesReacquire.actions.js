import PersonalAttributesReacquireService from "services/basicInfo/PersonalInfoMaintain/PersonalAttributesReacquireService";

export const getScreenDataPersonalAttributesReacquireAction = (params) => {
    return PersonalAttributesReacquireService.getScreenDataPersonalAttributesReacquireService(params)
}

export const reacquisitionPersonalAttributesReacquireAction = (params) => {
    return PersonalAttributesReacquireService.reacquisitionPersonalAttributesReacquireService(params)
}