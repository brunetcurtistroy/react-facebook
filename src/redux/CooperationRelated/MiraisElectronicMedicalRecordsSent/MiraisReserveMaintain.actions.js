import MiraisReserveMaintainService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/MiraisReserveMaintainService'
import { message } from "antd";
const MiraisReserveMaintainAction = {
    GetListData() {
        return MiraisReserveMaintainService.GetListData()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    SaveData(data) {
        return MiraisReserveMaintainService.SaveData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Delete(data) {
        return MiraisReserveMaintainService.Delete(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    ListDataNum(data) {
        return MiraisReserveMaintainService.ListDataNum(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    SaveDataNum(data) {
        return MiraisReserveMaintainService.SaveDataNum(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    DeleteNum(data) {
        return MiraisReserveMaintainService.DeleteNum(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
 
}
export default MiraisReserveMaintainAction;