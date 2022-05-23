import IntegrationReleasedService from "../../../services/AccountingBusiness/Invoice/IntegrationReleasedService";

export const getScreenIntegrationReleasedAction = () => {
    return IntegrationReleasedService.getScreenIntegrationReleasedService()
}

export const getDataIntegrationReleasedAction = (params) => {
    return IntegrationReleasedService.getDataIntegrationReleasedService(params)
}

export const execIntegrationReleasedAction = () => {
    return IntegrationReleasedService.execIntegrationReleasedService()
}