import PatternSettingSubService from "services/InspectionMaintenance/AnotherInspectItemSettingCategory/PatternSettingSubService";

export const getDataPatternSettingSubAction = () => {
    return PatternSettingSubService.getDataPatternSettingSubService()
}

export const saveDataPatternSettingSubAction = (params) => {
    return PatternSettingSubService.saveDataPatternSettingSubService(params)
}

export const deleteDataPatternSettingSubAction = (params) => {
    return PatternSettingSubService.deleteDataPatternSettingSubService(params)
}