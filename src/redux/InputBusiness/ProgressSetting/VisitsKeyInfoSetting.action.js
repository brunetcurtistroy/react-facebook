import { message } from "antd";
import VisitsKeyInfoSettingSevice from "services/InputBusiness/ProgressSetting/VisitsKeyInfoSettingService";

const VisitsKeyInfoSettingAction = {
    getDataKeyInfo() {
        return VisitsKeyInfoSettingSevice.getDataKeyInfo()
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

    createKeyInfo(data) {
        return VisitsKeyInfoSettingSevice.createKeyInfo(data)
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

    updateKeyInfo(data) {
        return VisitsKeyInfoSettingSevice.updateKeyInfo(data)
    },

    deleteKeyInfo(data) {
        return VisitsKeyInfoSettingSevice.deleteKeyInfo(data)
    },

    // KeyBreakdown
    getDataKeyBreakdown(data) {
        return VisitsKeyInfoSettingSevice.getDataKeyBreakdown(data)
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

    createAndUpdateKeyBreakdown(data) {
        return VisitsKeyInfoSettingSevice.createAndUpdateKeyBreakdown(data) 
    },

    deleteKeyBreakdown(data) {
        return VisitsKeyInfoSettingSevice.deleteKeyBreakdown(data)
    },
}

export default VisitsKeyInfoSettingAction;