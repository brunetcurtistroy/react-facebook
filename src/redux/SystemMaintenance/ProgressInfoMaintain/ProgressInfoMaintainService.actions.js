import ProgressInfoMaintainService from "services/SystemMaintenance/ProgressInfoMaintain/ProgressInfoMaintainService";

export const getScreenDataProgressInfoMaintainAction = () => {
    return ProgressInfoMaintainService.getScreenDataProgressInfoMaintainService()
}

export const getProgressListDataAction = (params) => {
    return ProgressInfoMaintainService.getProgressListDataService(params)
}

export const addUpdateNodeDataAction = (params) => {
    return ProgressInfoMaintainService.addUpdateNodeDataService(params)
}

export const deleteNodeDataAction = (params) => {
    return ProgressInfoMaintainService.deleteNodeDataService(params)
}