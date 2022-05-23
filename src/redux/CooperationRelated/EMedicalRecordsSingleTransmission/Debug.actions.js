
import { message } from "antd";
import DebugService from "services/CooperationRelated/EMedicalRecordsSingleTransmission/DebugService";

const DebugAction = {
    GetListData(params) {
        return DebugService.GetListData(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    Save(params) {
        return DebugService.Save(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    Delete(params) {
        return DebugService.Delete(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
}
export default DebugAction;