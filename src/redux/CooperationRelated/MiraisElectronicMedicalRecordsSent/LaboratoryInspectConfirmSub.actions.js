import LaboratoryInspectConfirmSubService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/LaboratoryInspectConfirmSubService'
import { message } from "antd";
const LaboratoryInspectConfirmSubAction = {
    getListData(data) {
        return LaboratoryInspectConfirmSubService.getListData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
   
}
export default LaboratoryInspectConfirmSubAction;