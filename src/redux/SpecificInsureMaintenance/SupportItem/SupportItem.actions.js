import SupportItemService from "services/SpecificInsureMaintenance/SupportItem/SupportItemService";

export const getDataSupportItemAction = (params) => {
    return SupportItemService.getDataSupportItemService(params)
}

export const saveAndUpdateSupportItemAction = (params) => {
    return SupportItemService.saveAndUpdateSupportItemService(params)
}

export const deleteSupportItemAction = (params) => {
    return SupportItemService.deleteSupportItemService(params)
}