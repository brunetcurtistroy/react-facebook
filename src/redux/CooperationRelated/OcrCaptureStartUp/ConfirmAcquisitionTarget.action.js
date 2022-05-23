import { message } from "antd";
import ConfirmAcquisitionTargetService from "services/CooperationRelated/OcrCaptureStartUp/ConfirmAcquisitionTargetService";

const ConfirmAcquisitionTargetAction = {
    getListData(data) {
        return ConfirmAcquisitionTargetService.getListData(data)
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

    updateExec(data) {
        return ConfirmAcquisitionTargetService.updateExec(data)
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
    }
}

export default ConfirmAcquisitionTargetAction;