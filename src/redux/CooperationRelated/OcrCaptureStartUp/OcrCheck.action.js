import { message } from "antd";
import OcrCheckService from "services/CooperationRelated/OcrCaptureStartUp/OcrCheckService";


const OcrCheckAction = {
    getDataContent(data) {
        return OcrCheckService.getDataContent(data)
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

    getDataOcrCheck(data) {
        return OcrCheckService.getDataOcrCheck(data)
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

    fileAcquisition_F12(data) {
        return OcrCheckService.fileAcquisition_F12(data)
    }
}

export default OcrCheckAction;