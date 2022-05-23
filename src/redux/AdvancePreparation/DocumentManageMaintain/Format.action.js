import { message } from "antd";
import FormatService from "services/AdvancePreparation/DocumentManageMaintain/FormatService";

const FormatAction = {
    getScreenData(data) {
        return FormatService.getScreenData(data)
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
export default FormatAction;