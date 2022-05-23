import { message } from "antd";
import EMedicalRecordsTransmissionHistoryService from "services/CooperationRelated/EMedicalRecordsBatchTransmission/EMedicalRecordsTransmissionHistoryService";


const EMedicalRecordsTransmissionHistoryAction = {
    getDataInspect(data) {
        return EMedicalRecordsTransmissionHistoryService.getDataInspect(data)
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

    getDataImage(data) {
        return EMedicalRecordsTransmissionHistoryService.getDataImage(data)
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
    }
}

export default EMedicalRecordsTransmissionHistoryAction;