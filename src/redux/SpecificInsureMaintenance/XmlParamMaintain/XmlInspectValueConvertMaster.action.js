import { message } from "antd";
import XmlInspectValueConvertMasterService from "services/SpecificInsureMaintenance/XmlParamMaintain/XmlInspectValueConvertMasterService";

const XmlInspectValueConvertMasterAction = {
    getScreenData() {
        return XmlInspectValueConvertMasterService.getScreenDataService()
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
        return XmlInspectValueConvertMasterService.createAndUpdateDataService(data)
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
        return XmlInspectValueConvertMasterService.deleteDataService(data)
    }
}
export default XmlInspectValueConvertMasterAction;