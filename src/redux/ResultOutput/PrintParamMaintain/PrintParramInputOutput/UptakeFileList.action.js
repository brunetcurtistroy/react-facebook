import UptakeFileListService from "services/ResultOutput/PrintParamMaintain/PrintParramInputOutput/UptakeFileListService"
import { message } from "antd";

const UptakeFileListAction = {
    inputexec(data) {
        return UptakeFileListService.inputexec(data)
    },

}
export default UptakeFileListAction;