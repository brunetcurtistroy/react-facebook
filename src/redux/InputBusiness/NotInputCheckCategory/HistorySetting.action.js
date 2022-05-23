
import { message } from "antd";
import HistorySettingService from "services/InputBusiness/NotInputCheckCategory/HistorySettingService";

const HistorySettingAction = {
    getDataScreen(data) {
        return HistorySettingService.getDataScreen(data)
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

    closeScreen(data) {
        return HistorySettingService.closeScreen(data)
    },

    saveData(data) {
        return HistorySettingService.saveData(data)
    }
};

export default HistorySettingAction;