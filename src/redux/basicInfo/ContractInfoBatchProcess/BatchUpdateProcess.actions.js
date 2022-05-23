import BatchUpdateProcessService from "services/basicInfo/ContractInfoBatchProcess/BatchUpdateProcessService"

export const getScreenDataBatchUpdateAction = () => {
    return BatchUpdateProcessService.getScreenDataBatchUpdateService()
}

export const getDataSetConfigurationBatchUpdateProcessAction = (params) => {
    return BatchUpdateProcessService.getDataSetConfigurationBatchUpdateProcessService(params)
}

export const saveAndUpdateBatchUpdateProcessAction = (params) => {
    return BatchUpdateProcessService.saveAndUpdateBatchUpdateProcessService(params)
}

export const deleteDataBatchUpdateProcessAction = (params) => {
    return BatchUpdateProcessService.deleteDataBatchUpdateProcessService(params)
}

export const calculatorUpdateProcessAction = {
    InputChange: (params) => BatchUpdateProcessService.InputChangeService(params),
    LioTaxClassifyChange: (params) => BatchUpdateProcessService.LioTaxClassifyChangeService(params),
    eventF12: (params) => BatchUpdateProcessService.eventF12Service(params),

    W3InsurerTotalChange: (params) => BatchUpdateProcessService.W3InsurerTotalChangeService(params),
    W3InsurerTaxChange: (params) => BatchUpdateProcessService.W3InsurerTaxChangeService(params),
    
    W3OfficeTotalChange: (params) => BatchUpdateProcessService.W3OfficeTotalChangeService(params),
    W3OfficeTaxChange: (params) => BatchUpdateProcessService.W3OfficeTaxChangeService(params),

    W3OtherOrgTotalChange: (params) => BatchUpdateProcessService.W3OtherOrgTotalChangeService(params),
    W3OtherOrgTaxChange: (params) => BatchUpdateProcessService.W3OtherOrgTaxChangeService(params),

    W3Person1TotalChange: (params) => BatchUpdateProcessService.W3Person1TotalChangeService(params),
    W3Person1TaxChange: (params) => BatchUpdateProcessService.W3Person1TaxChangeService(params),

    W3Person2TotalChange: (params) => BatchUpdateProcessService.W3Person2TotalChangeService(params),
    W3Person2TaxChange: (params) => BatchUpdateProcessService.W3Person2TaxChangeService(params),

    W3Person3TotalChange: (params) => BatchUpdateProcessService.W3Person3TotalChangeService(params),
    W3Person3TaxChange: (params) => BatchUpdateProcessService.W3Person3TaxChangeService(params),
}