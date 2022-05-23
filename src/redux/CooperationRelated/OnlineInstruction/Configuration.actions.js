import ConfigurationService from "services/CooperationRelated/OnlineInstruction/ConfigurationService";

export const getListDataConfigurationAction = () => {
    return ConfigurationService.getListDataConfigurationService()
}

export const saveDataConfigurationAction = (params) => {
    return ConfigurationService.saveDataConfigurationService(params)
}

export const deleteDataConfigurationAction = (params) => {
    return ConfigurationService.deleteDataConfigurationService(params)
}