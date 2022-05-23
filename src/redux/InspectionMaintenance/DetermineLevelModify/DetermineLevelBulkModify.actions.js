import DetermineLevelBulkModifyService from "services/InspectionMaintenance/DetermineLevelModify/DetermineLevelBulkModifyService";

export const getDataDetermineLevelBulkModifyAction = () => {
    return DetermineLevelBulkModifyService.getDataDetermineLevelBulkModifyService()
}

export const saveDataDetermineLevelBulkModifyAction = (params) => {
    return DetermineLevelBulkModifyService.saveDataDetermineLevelBulkModifyService(params)
}

export const deleteDataDetermineLevelBulkModifyAction = (params) => {
    return DetermineLevelBulkModifyService.deleteDataDetermineLevelBulkModifyService(params)
}