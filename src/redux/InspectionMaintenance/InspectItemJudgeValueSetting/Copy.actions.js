import CopyService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/CopyService";
import { message } from "antd";
const CopyAction = {
    GetScreenData(data) {
        return CopyService.GetScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Run_F12(data) {
        return CopyService.Run_F12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default CopyAction;