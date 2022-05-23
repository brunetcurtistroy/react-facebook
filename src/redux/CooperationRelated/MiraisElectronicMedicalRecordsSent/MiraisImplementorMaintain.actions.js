import MiraisImplementorMaintainService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/MiraisImplementorMaintainService'
import { message } from "antd";
const MiraisImplementorMaintainAction = {
    GetListData() {
        return MiraisImplementorMaintainService.GetListData()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    SaveData(data) {
        return MiraisImplementorMaintainService.SaveData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
 
}
export default MiraisImplementorMaintainAction;