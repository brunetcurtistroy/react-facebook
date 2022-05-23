import { message } from "antd";
import XmlInspectValueConvertEMService from "services/SpecificInsureMaintenance/XmlParamMaintain/XmlInspectValueConvertEMService";

const XmlInspectValueConvertEMAction = {
    getScreenData() {
        return XmlInspectValueConvertEMService.getScreenDataService()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                const res = err.response;
                if (!res || !res.data || !res.data.message) {
                    message.error("エラーが発生しました");
                    return;
                }
                message.error(res.data.message);
            });
    },

    createAndUpdateData(data) {
        return XmlInspectValueConvertEMService.createAndUpdateDataService(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                const res = err.response;
                if (!res || !res.data || !res.data.message) {
                    message.error("エラーが発生しました");
                    return;
                }
                message.error(res.data.message);
            });
    },

    deleteData(data) {
        return XmlInspectValueConvertEMService.deleteDataService(data)
    }
}
export default XmlInspectValueConvertEMAction;