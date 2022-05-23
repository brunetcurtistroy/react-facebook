import { message } from "antd";
import ConditionExpressCmtSettingService from "services/InspectionMaintenance/ConditionExpressCmtSetting/ConditionExpressCmtSettingService";

const ConditionExpressCmtSettingAction = {
    getCommentGroupCbx() {
        return ConditionExpressCmtSettingService.getCommentGroupCbxService()
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

    getDataTeachChingItemList(data) {
        return ConditionExpressCmtSettingService.getDataTeachChingItemListService(data)
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

    updateTeachChingItemList(data) {
        return ConditionExpressCmtSettingService.updateTeachChingItemListService(data)
    },

    deleteDateTeachChingItemList(data) {
        return ConditionExpressCmtSettingService.deleteDateService(data)
    }
}

export default ConditionExpressCmtSettingAction;