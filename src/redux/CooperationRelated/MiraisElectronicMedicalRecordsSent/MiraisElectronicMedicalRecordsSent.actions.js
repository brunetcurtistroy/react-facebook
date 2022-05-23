import MiraisElectronicMedicalRecordsSentService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/MiraisElectronicMedicalRecordsSentService'
import { message } from "antd";
const MiraisElectronicMedicalRecordsSentAction = {
    GetListData(data) {
        return MiraisElectronicMedicalRecordsSentService.GetListData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    F12(data) {
        return MiraisElectronicMedicalRecordsSentService.F12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    SubmitBtnBefore(data) {
        return MiraisElectronicMedicalRecordsSentService.SubmitBtnBefore(data)
    },
 
}
export default MiraisElectronicMedicalRecordsSentAction;