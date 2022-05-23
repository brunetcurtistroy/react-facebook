import ConfirmScreenService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/ConfirmScreenService'
import { message } from "antd";
const ConfirmScreenAction = {
    Check_F12() {
        return ConfirmScreenService.Check_F12()
    },
    GetListData(data) {
        return ConfirmScreenService.ListData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } ,
    ListInspect(data) {
        return ConfirmScreenService.ListInspect(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default ConfirmScreenAction;