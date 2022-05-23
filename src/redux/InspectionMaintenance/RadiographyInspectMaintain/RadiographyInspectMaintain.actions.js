import RadiographyInspectMaintainService from "services/InspectionMaintenance/RadiographyInspectMaintain/RadiographyInspectMaintainService";

export const getRadioGraphyInspectMaintainAction = () => {
    return RadiographyInspectMaintainService.getRadioGraphyInspectMaintainService()
}

export const saveAndUpdateRadioGraphyInspectMaintainAction = (params) => {
    return RadiographyInspectMaintainService.saveAndUpdateRadioGraphyInspectMaintainService(params)
}

export const deleteRadioGraphyInspectMaintainAction = (params) => {
    return RadiographyInspectMaintainService.deleteRadioGraphyInspectMaintainService(params)
}