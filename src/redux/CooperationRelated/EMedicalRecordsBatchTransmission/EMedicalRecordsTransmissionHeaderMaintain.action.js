import { message } from "antd";
import EMedicalRecordsTransmissionHeaderMaintainService from "services/CooperationRelated/EMedicalRecordsBatchTransmission/EMedicalRecordsTransmissionHeaderMaintainService";

const EMedicalRecordsTransmissionHeaderMaintainAction = {
    getScreenData() {
        return EMedicalRecordsTransmissionHeaderMaintainService.getScreenData()
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

    getListData() {
        return EMedicalRecordsTransmissionHeaderMaintainService.getListData()
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

    saveAndUpdate(data) {
        return EMedicalRecordsTransmissionHeaderMaintainService.saveAndUpdate(data)
    },

    deleteData(data) {
        return EMedicalRecordsTransmissionHeaderMaintainService.deleteData(data)
    }
}

export default EMedicalRecordsTransmissionHeaderMaintainAction;