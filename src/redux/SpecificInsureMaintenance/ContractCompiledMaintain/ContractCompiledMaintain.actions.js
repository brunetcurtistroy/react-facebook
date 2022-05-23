import ContractCompiledMaintainService from "services/SpecificInsureMaintenance/ContractCompiledMaintain/ContractCompiledMaintainService";

// WS1305001_ContractCompiledMaintain
export const getDataContractCompiledMaintainAction = () => {
    return ContractCompiledMaintainService.getDataContractCompiledMaintainService()
}

export const saveDataContractCompiledMaintainAction = (params) => {
    return ContractCompiledMaintainService.saveDataContractCompiledMaintainService(params)
}

export const deleteDataContractCompiledMaintainAction = (params) => {
    return ContractCompiledMaintainService.deleteDataContractCompiledMaintainService(params)
}

// WS1305004_CompiledSelect
export const getDataCompiledSelectAction = () => {
    return ContractCompiledMaintainService.getDataCompiledSelectService()
}