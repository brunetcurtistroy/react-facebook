import { message } from "antd";
import InsurerByCourseCheckupsTypeService from "services/SpecificInsureMaintenance/XmlParamMaintain/InsurerByCourseCheckupsTypeService";

const InsurerByCourseCheckupsTypeAction = {
    getScreenData() {
        return InsurerByCourseCheckupsTypeService.getScreenDataService()
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
        return InsurerByCourseCheckupsTypeService.createAndUpdateDataService(data)
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
        return InsurerByCourseCheckupsTypeService.deleteDataService(data)
    }
}
export default InsurerByCourseCheckupsTypeAction;