import UseInspectService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/UseInspectService";
import { message } from "antd";
const UseInspectAction = {
    GetScreenData(data) {
        return UseInspectService.GetScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Run_F12(data) {
        return UseInspectService.Run_F12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default UseInspectAction;