import ConditionExpressSetService from "services/ResultOutput/BindingModeSetting/ConditionExpressSetService";

export const getScreenConditionExpressSetAction = (params) => {
    return ConditionExpressSetService.getScreenConditionExpressSetService(params)
}

export const outputConditionExpressSetAction = (params) => {
    return ConditionExpressSetService.outputConditionExpressSetService(params)
}