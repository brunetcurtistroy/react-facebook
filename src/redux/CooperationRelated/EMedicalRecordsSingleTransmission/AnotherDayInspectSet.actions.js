import { message } from "antd";
import AnotherDayInspectSetService from "services/CooperationRelated/EMedicalRecordsSingleTransmission/AnotherDayInspectSetService";

const AnotherDayInspectSetAction = {
    GetListData(params) {
        return AnotherDayInspectSetService.GetListData(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    },
    Change(params) {
        return AnotherDayInspectSetService.Change(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    ChangeData(params) {
        return AnotherDayInspectSetService.ChangeData(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    SettingBtn(params) {
        return AnotherDayInspectSetService.SettingBtn(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    InspectContent(params) {
        return AnotherDayInspectSetService.InspectContent(params)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
            message.error(err.response.data.message); 
        });
    }
}
export default AnotherDayInspectSetAction;