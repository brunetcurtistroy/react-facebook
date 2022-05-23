import NonConsultDateSettingService from "services/SystemMaintenance/NonConsultDateSetting/NonConsultDateSettingService";

// WS1494003_CollectSetting
export const batchSettingProcessDateNoCorreAction = (params) => {
    return NonConsultDateSettingService.batchSettingProcessDateNoCorreService(params)
}

// WS1494006_SingleSetting
export const getDataVariousAggregateAction = (params) => {
    return NonConsultDateSettingService.getDataVariousAggregateService(params)
}

export const tableRewriteAction = (params) => {
    return NonConsultDateSettingService.tableRewriteService(params)
}
