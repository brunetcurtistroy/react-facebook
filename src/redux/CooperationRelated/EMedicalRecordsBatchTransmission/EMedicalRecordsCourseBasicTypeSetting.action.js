import { message } from "antd";
import EMedicalRecordsCourseBasicTypeSettingService from "services/CooperationRelated/EMedicalRecordsBatchTransmission/EMedicalRecordsCourseBasicTypeSettingService";


const EMedicalRecordsCourseBasicTypeSettingAction = {
    getScreenData() {
        return EMedicalRecordsCourseBasicTypeSettingService.getScreenData()
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

    getDataTable() {
        return EMedicalRecordsCourseBasicTypeSettingService.getDataTable()
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

    getDataContractInfo(data) {
        return EMedicalRecordsCourseBasicTypeSettingService.getDataContractInfo(data)
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

    createAndUpdate(data) {
        return EMedicalRecordsCourseBasicTypeSettingService.createAndUpdate(data)
    },

    delete(data) {
        return EMedicalRecordsCourseBasicTypeSettingService.delete(data)
    }
}

export default EMedicalRecordsCourseBasicTypeSettingAction;