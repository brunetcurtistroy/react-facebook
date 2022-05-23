import InspectMaintainService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/InspectMaintainService'
import { message } from "antd";
const InspectMaintainAction = {
    GetListData() {
        return InspectMaintainService.GetListData()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    SaveData(data) {
        return InspectMaintainService.SaveData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Delete(data) {
        return InspectMaintainService.Delete(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
 
}
export default InspectMaintainAction;