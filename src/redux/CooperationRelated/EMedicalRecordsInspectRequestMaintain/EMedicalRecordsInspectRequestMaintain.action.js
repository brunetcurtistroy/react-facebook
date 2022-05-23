
import { message } from "antd";
import EMedicalRecordsInspectRequestMaintainService from "services/CooperationRelated/EMedicalRecordsInspectRequestMaintain/EMedicalRecordsInspectRequestMaintainService";

const EMedicalRecordsInspectRequestMaintainAction = {
    getDataSearch(params) {
        return EMedicalRecordsInspectRequestMaintainService.getDataSearch(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                const res = err.response;
                if (!res || !res.data || !res.data.message) {
                    message.error("エラーが発生しました");
                    return;
                }
                message.error(res.data.message);
            });
    },

    addAndUpdateRecord(params) {
        return EMedicalRecordsInspectRequestMaintainService.addAndUpdateRecord(params)
    },

    deleteRecord(params) {
        return EMedicalRecordsInspectRequestMaintainService.deleteRecord(params)
    },

}
export default EMedicalRecordsInspectRequestMaintainAction;