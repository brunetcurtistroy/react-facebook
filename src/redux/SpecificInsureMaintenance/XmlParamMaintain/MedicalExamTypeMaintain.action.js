import { message } from "antd";
import MedicalExamTypeMaintainService from "services/SpecificInsureMaintenance/XmlParamMaintain/MedicalExamTypeMaintainService";

const MedicalExamTypeMaintainAction = {
    getScreenData() {
        return MedicalExamTypeMaintainService.getScreenDataService()
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

    createAndUpdateData(data) {
        return MedicalExamTypeMaintainService.createAndUpdateDataService(data)
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

    deleteData(data) {
        return MedicalExamTypeMaintainService.deleteDataService(data)
    }
}
export default MedicalExamTypeMaintainAction;