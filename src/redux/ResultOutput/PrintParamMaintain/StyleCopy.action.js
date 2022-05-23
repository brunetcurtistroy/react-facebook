import StyleCopyService from "services/ResultOutput/PrintParamMaintain/StyleCopyService"
import { message } from "antd";

const StyleCopyAction = {
    // CopyExec(data) {
    //     return StyleCopyService.CopyExec(data)
    //         .then((res) => {
    //             return res?.data;
    //         })
    //         .catch((err) => {
    //             message.error(err.response.data.message);
    //             console.log(err.response.data.message);
    //         });
    // },
    CopyExec(data) {
        return StyleCopyService.CopyExec(data)
    },
}
export default StyleCopyAction;