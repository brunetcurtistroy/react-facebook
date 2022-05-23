import SelectBreakdownService from "services/ResultOutput/RomotoArticle52/SelectBreakdownService"

export const getDataSelectBreakdownAction = () => {
    return SelectBreakdownService.getDataSelectBreakdownService()
}

export const selectRecordSelectBreakdownAction = (params) => {
    return SelectBreakdownService.selectRecordSelectBreakdownService(params)
}

export const selectAllRecordSelectBreakdownAction = (params) => {
    return SelectBreakdownService.selectAllRecordSelectBreakdownService(params)
}