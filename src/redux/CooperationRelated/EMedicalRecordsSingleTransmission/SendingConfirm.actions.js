
import { message } from "antd";
import SendingConfirmService from "services/CooperationRelated/EMedicalRecordsSingleTransmission/SendingConfirmService";

const SendingConfirmAction = {
    Transmiss(params) {
        return SendingConfirmService.Transmiss(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    } 
}
export default SendingConfirmAction;