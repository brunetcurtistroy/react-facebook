import SelectedRangeService from "services/basicInfo/InsurerInfoMaintain/SelectedRangeService"

export const selectedRangeAction = (params) => {
    return SelectedRangeService.selectedRangeService(params)
}

export const saveSelectRangeAction = (params) => {
    return SelectedRangeService.saveSelectRangeService(params)
}