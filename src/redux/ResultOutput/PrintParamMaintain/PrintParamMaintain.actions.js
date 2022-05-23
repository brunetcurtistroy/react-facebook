import PrintParamMaintainService from "services/ResultOutput/PrintParamMaintain/PrintParamMaintainService";

export const getPrintParamMaintainAction = () => {
    return PrintParamMaintainService.getPrintParamMaintainService()
}

export const deletePrintParamMaintainAction = (params) => {
    return PrintParamMaintainService.deletePrintParamMaintainService(params)
}

export const savePrintParamMaintainAction = (params) => {
    return PrintParamMaintainService.savePrintParamMaintainService(params)
}

export const itemF12Action = (params) => {
    return PrintParamMaintainService.itemF12Service(params)
}

export const stsChangeAction = (params) => {
    return PrintParamMaintainService.stsChangeService(params)
}
export const printf10 = (params) => {
    return PrintParamMaintainService.printf10(params)
}