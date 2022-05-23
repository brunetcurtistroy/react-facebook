import InspectItemInfoMaintainService from "services/InspectionMaintenance/InspectItemInfoMaintain/InspectItemInfoMaintainService";

export const getScreenDataAction = (params) => {
    return InspectItemInfoMaintainService.getScreenDataService(params)
}

export const deleteDataAction = (params) => {
    return InspectItemInfoMaintainService.deleteDataService(params)
}