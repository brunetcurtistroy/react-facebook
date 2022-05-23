import MiraisInspectMaintainService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/MiraisInspectMaintainService'
import { message } from "antd";
const  MiraisInspectMaintainAction = {
    GetListData() {
        return MiraisInspectMaintainService.GetListData()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    SaveData(data) {
        return MiraisInspectMaintainService.SaveData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Delete(data) {
        return MiraisInspectMaintainService.Delete(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
   
}
export default  MiraisInspectMaintainAction;