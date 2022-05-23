import CounterService from "services/CounterBusiness/Counter/CounterService";

export const getIntroduceCounterAction = (params) => {
    return CounterService.getIntroduceCounterService(params)
}

export const getListDataCounterAction = () => {
    return CounterService.getListDataCounterService()
}

export const AcceptButtonAction = (params) => {
    return CounterService.AcceptButtonService(params)
}

export const getRefineAction = (params) => {
    return CounterService.getRefineService(params)
}
export const getSrceenDataAction = (params) => {
    return CounterService.getSrceenData(params)
}

export const eventEnterC_CounterAction = (params) => {
    return CounterService.eventEnterC_CounterService(params)
}

export const userAction3CounterAction = (params) => {
    return CounterService.userAction3CounterService(params)
}