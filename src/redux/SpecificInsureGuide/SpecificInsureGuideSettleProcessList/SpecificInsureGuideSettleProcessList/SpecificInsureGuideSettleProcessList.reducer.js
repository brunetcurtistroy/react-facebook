import { SpecificInsureGuideSettleProcessListType } from "./SpecificInsureGuideSettleProcessList.types";
const initState = {
    dataListProcess: {},
}

const SpecificInsureGuideSettleProcessListReducer = (state = initState, action) => {
    switch (action.type) {
        case SpecificInsureGuideSettleProcessListType.SET_DATA_LIST_PROCESS:
            return {
                ...state,
                dataListProcess: action.payload
            }
    
        default: return state;
    }
} 

export default SpecificInsureGuideSettleProcessListReducer;