import RecurrenceNumberService from "services/ResultOutput/PrintParamMaintain/RecurrenceNumberService"
import { message } from "antd";

const RecurrenceNumberAction = {
    getScreenData(data) {
        return RecurrenceNumberService.getScreenData(data)
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

    F12(data) {
        return RecurrenceNumberService.F12(data)
    },

}
export default RecurrenceNumberAction;