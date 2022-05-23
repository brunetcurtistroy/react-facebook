import SpecificInsureGuideSettleProcessListService from "services/SpecificInsureGuide/SpecificInsureGuideSettleProcessList/SpecificInsureGuideSettleProcessListService";
import { SpecificInsureGuideSettleProcessListType } from "./SpecificInsureGuideSettleProcessList.types";

export const dataEventExecAction = (params) => {
    return SpecificInsureGuideSettleProcessListService.dataEventExecService(params)
}

export const setDataListProcessAction = (data) => {
    return {
        type: SpecificInsureGuideSettleProcessListType.SET_DATA_LIST_PROCESS,
        payload: data
    }
}