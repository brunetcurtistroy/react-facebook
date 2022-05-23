
import { message } from "antd";
import CopyService from "services/ResultOutput/CsvCreateParamMaintain/CopyService";


const CopyAction = {
    // 0460008
    getScreenData(data) {
        return CopyService.getScreenData(data)
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

    copyData(data) {
        return CopyService.copyData(data)
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
    CopyRegister(data) {
        return CopyService.CopyRegister(data)
    },
};

export default CopyAction;