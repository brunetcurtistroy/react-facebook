import { message } from "antd";
import InspectConditionSettingService from "services/AdvancePreparation/DocumentManageMaintain/InspectConditionSettingService";

const InspectConditionSettingAction = {
    getScreenData(data) {
        return InspectConditionSettingService.getScreenData(data)
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

    getDataTable() {
        return InspectConditionSettingService.getDataTable()
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
        return InspectConditionSettingService.createAndUpdateData(data)
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
        return InspectConditionSettingService.deleteData(data)
    }
}
export default InspectConditionSettingAction;