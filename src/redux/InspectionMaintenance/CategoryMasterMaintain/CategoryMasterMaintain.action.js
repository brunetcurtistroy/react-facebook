import CategoryMasterMaintainService from "services/InspectionMaintenance/CategoryMasterMaintain/CategoryMasterMaintainService";

export const getCategoryMasterMaintainAction = (params) => {
    return CategoryMasterMaintainService.getCategoryMasterMaintainService(params)
}

export const getSiteFindingsAction = (params) => {
    return CategoryMasterMaintainService.getSiteFindingsService(params)
}

export const saveAndUpdateCategoryMasterMaintainAction = (params) => {
    return CategoryMasterMaintainService.saveAndUpdateCategoryMasterMaintainService(params)
}

export const deleteCategoryMasterMaintainAction = (id) => {
    return CategoryMasterMaintainService.deleteCategoryMasterMaintainService(id)
}

export const deleteOpinionCategoryMasterMaintainAction = (params) => {
    return CategoryMasterMaintainService.deleteOpinionCategoryMasterMaintainService(params)
}

export const deletePartCategorMasterMaintainAction = (params) => {
    return CategoryMasterMaintainService.deletePartCategorMasterMaintainService(params)
}

export const updateOrCreatePartCategoryMasterMaintainAction = (params) => {
    return CategoryMasterMaintainService.updateOrCreatePartCategoryMasterMaintainService(params)
}

export const updateOrCreateOpinionCategoryMasterMaintainAction = (params) => {
    return CategoryMasterMaintainService.updateOrCreateOpinionCategoryMasterMaintainService(params)
}

export const eventF7CategoryMasterMaintainAction = (params) => {
    return CategoryMasterMaintainService.eventF7CategoryMasterMaintainService(params)
}