import MiraisTransmissionRecordService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/MiraisTransmissionRecordService'
import { message } from "antd";
const MiraisTransmissionRecordAction = {
    GetListData(data) {
        return MiraisTransmissionRecordService.getListData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
   
}
export default MiraisTransmissionRecordAction;