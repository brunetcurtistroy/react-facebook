import ErrorConfirmSubService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/ErrorConfirmSubService'
import { message } from "antd";
const ErrorConfirmSubAction = {
    ErrorConfirm(data) {
        return ErrorConfirmSubService.errorConfirm(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
   
}
export default ErrorConfirmSubAction;