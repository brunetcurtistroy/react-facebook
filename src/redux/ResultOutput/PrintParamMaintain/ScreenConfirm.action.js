import ScreenConfirmService from "services/ResultOutput/PrintParamMaintain/ScreenConfirmService"
import { message } from "antd";

const ScreenConfirmAction = {
    getScreenData(data) {
        return ScreenConfirmService.getScreenData(data)
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
export default ScreenConfirmAction;