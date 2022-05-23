import EffectiveDateSelectService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/EffectiveDateSelectService";
import { message } from "antd";
const EffectiveDateSelectAction = {
    GetScreenData363() {
        return EffectiveDateSelectService.GetScreenData363()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    GetScreenData364() {
        return EffectiveDateSelectService.GetScreenData364()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
}
export default EffectiveDateSelectAction;