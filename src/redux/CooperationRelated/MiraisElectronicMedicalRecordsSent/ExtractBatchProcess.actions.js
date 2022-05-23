import ExtractBatchProcessService from 'services/CooperationRelated/MiraisElectronicMedicalRecordsSent/ExtractBatchProcessService'
import { message } from "antd";
const ExtractBatchProcessAction = {
    GetListData(data) {
        return ExtractBatchProcessService.getListData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    F11(data) {
        return ExtractBatchProcessService.F11(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    F03(data) {
        return ExtractBatchProcessService.F03(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    F12(data) {
        return ExtractBatchProcessService.F12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
   
}
export default ExtractBatchProcessAction;
