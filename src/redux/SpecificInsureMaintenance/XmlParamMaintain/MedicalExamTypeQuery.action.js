import { message } from "antd";
import MedicalExamTypeQueryService from "services/SpecificInsureMaintenance/XmlParamMaintain/MedicalExamTypeQueryService";

const MedicalExamTypeQueryAction = {
    getScreenData() {
        return MedicalExamTypeQueryService.getScreenDataService()
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
export default MedicalExamTypeQueryAction;