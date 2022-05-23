import AcceptanceBatchProcessService from "services/CounterBusiness/AcceptanceBatchProcess/AcceptanceBatchProcessService";

export const getScreenAcceptanceBatchProcessAction = (params) => {
    return AcceptanceBatchProcessService.getScreenAcceptanceBatchProcessService(params)
}

export const eventRetrievalAcceptanceBatchProcessAction = (params) => {
    return AcceptanceBatchProcessService.eventRetrievalAcceptanceBatchProcessService(params)
}

export const eventAcceptOrCancelSubAcceptanceBatchProcessAction = (params) => {
    return AcceptanceBatchProcessService.eventAcceptOrCancelSubAcceptanceBatchProcessService(params)
}