
import ParamInputService from "services/ResultOutput/CsvCreateParamMaintain/ParamInputService";


const ParamInputAction = { 
    execEvent(data) {
        return ParamInputService.execEvent(data) 
    }
};

export default ParamInputAction;