import PersonalNumberIntegrationService from "services/basicInfo/PersonalNumberIntegration/PersonalNumberIntegrationService";

export const getScreenDataAction = (params) => {
    return PersonalNumberIntegrationService.getScreenDataService(params)
}

export const changePersonalNumberAction = (params) => {
    return PersonalNumberIntegrationService.changePersonalNumberService(params)
}

export const buttonF12Action = (params) => {
    return PersonalNumberIntegrationService.buttonF12Service(params)
}