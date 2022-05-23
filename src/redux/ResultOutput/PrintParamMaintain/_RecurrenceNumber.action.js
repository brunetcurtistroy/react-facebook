import RecurrenceNumberService from "services/ResultOutput/PrintParamMaintain/_RecurrenceNumberService"
import { message } from "antd";

const RecurrenceNumberAction = {
    reCurrenceNumConfirmed(data) {
        return RecurrenceNumberService.reCurrenceNumConfirmed(data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    recurrenceNumUpdate(data) {
        return RecurrenceNumberService.recurrenceNumUpdate(data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
}
export default RecurrenceNumberAction;