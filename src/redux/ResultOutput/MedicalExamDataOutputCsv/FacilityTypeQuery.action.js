
import { message } from "antd";
import FacilityTypeQueryService from "services/ResultOutput/MedicalExamDataOutputCsv/FacilityTypeQueryService";

const FacilityTypeQueryAction = {
    GetScreenData() {
        return FacilityTypeQueryService.GetScreenData()
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
};

export default FacilityTypeQueryAction;