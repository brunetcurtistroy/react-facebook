import { message } from "antd";
import SettingOcrCaptureService from "services/CooperationRelated/OcrCaptureStartUp/SettingOcrCaptureService";



const SettingOcrCaptureAction = {
    getDataOrcCapture() {
        return SettingOcrCaptureService.getDataOrcCapture()
    },

    saveDataOrcCapture(data) {
        return SettingOcrCaptureService.saveDataOrcCapture(data)
    },

    deleteDataOrcCapture(data) {
        return SettingOcrCaptureService.deleteDataOrcCapture(data)
    },

    getDataOrcFormat(data) {
        return SettingOcrCaptureService.getDataOrcFormat(data)
    },

    saveDataOrcFormat(data) {
        return SettingOcrCaptureService.saveDataOrcFormat(data)
    },

    deleteDataOrcFormat(data) {
        return SettingOcrCaptureService.deleteDataOrcFormat(data)
    },

    getDataAdvanceSetting(data) {
        return SettingOcrCaptureService.getDataAdvanceSetting(data)
    },

    saveDataAdvanceSetting(data) {
        return SettingOcrCaptureService.saveDataAdvanceSetting(data)
    },

    getDataOptionInput(data) {
        return SettingOcrCaptureService.getDataOptionInput(data)
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
}

export default SettingOcrCaptureAction;