import InspectItemJudgeValueSettingService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/InspectItemJudgeValueSettingService";
import { message } from "antd";
const InspectItemJudgeValueSettingAction = {
    GetScreenData() {
        return InspectItemJudgeValueSettingService.GetScreenData()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    UpdateData(params) {
        return InspectItemJudgeValueSettingService.UpdateData(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    ExamList(params) {
        return InspectItemJudgeValueSettingService.ExamList(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
     
}
export default InspectItemJudgeValueSettingAction;