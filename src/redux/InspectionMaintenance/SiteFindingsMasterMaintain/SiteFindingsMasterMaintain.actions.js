import SiteFindingsMasterMaintainService from "services/InspectionMaintenance/SiteFindingsMasterMaintain/SiteFindingsMasterMaintainService";

export const getDataSiteFindingsMasterMaintainAction = () => {
    return SiteFindingsMasterMaintainService.getDataSiteFindingsMasterMaintainService()
}

export const getSiteTableAndFindingsTableAction = (params) => {
    return SiteFindingsMasterMaintainService.getSiteTableAndFindingsTableService(params)
}

export const saveAndUpdateSiteFindingsMasterMaintainAction = (params) => {
    return SiteFindingsMasterMaintainService.saveAndUpdateSiteFindingsMasterMaintainService(params)
}

export const deleteSiteFindingsMasterMaintainAction = (id) => {
    return SiteFindingsMasterMaintainService.deleteSiteFindingsMasterMaintainService(id)
}

export const deleteSiteTableAction = (params) => {
    return SiteFindingsMasterMaintainService.deleteSiteTableService(params)
}

export const deleteFindingsTableAction = (params) => {
    return SiteFindingsMasterMaintainService.deleteFindingsTableService(params)
}