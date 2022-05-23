import CautionGuideMatterCmtMaintainService from "services/InspectionMaintenance/CautionGuideMatterCmtMaintain/CautionGuideMatterCmtMaintainService";
import { message } from "antd";
const CautionGuideMatterCmtMaintainAction = {
    getCommentLists(params) {
        return CautionGuideMatterCmtMaintainService.getCommentLists(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
     
}
export default CautionGuideMatterCmtMaintainAction;