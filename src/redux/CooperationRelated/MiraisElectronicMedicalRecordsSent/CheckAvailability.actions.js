import CheckAvailabilityService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/CheckAvailabilityService'
import { message } from "antd";
const CheckAvailabilityAction = {
    GetListData(data) {
        return CheckAvailabilityService.getListData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    BreakDown(data) {
        return CheckAvailabilityService.BreakDown(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } ,
    Recount_F12(data) {
        return CheckAvailabilityService.Recount_F12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default CheckAvailabilityAction;