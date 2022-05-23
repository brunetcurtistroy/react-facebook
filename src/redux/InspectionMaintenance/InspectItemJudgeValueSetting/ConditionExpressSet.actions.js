import ConditionExpressSetService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/ConditionExpressSetService";
import { message } from "antd";
const ConditionExpressSetAction = {
    GetScreenData(data) {
        return ConditionExpressSetService.GetScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    UpdateF12(data) {
        return ConditionExpressSetService.UpdateF12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Cancel(data) {
        return ConditionExpressSetService.Cancel(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    CorrectF03(data) {
        return ConditionExpressSetService.CorrectF03(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    RedisplayF11(data) {
        return ConditionExpressSetService.RedisplayF11(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
}
export default ConditionExpressSetAction;