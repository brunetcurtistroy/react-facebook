import { message } from "antd";
import CopyingProcessService from "services/AdvancePreparation/DocumentManageMaintain/CopyingProcessService";

const CopyingProcessAction = {
    copyData(data) {
        return CopyingProcessService.copyData(data)
    }
}
export default CopyingProcessAction;