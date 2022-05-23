import { message } from "antd";
import WS0638003_FormatQueryService from "services/AdvancePreparation/DocumentManageMaintain/WS0638003_FormatQueryService";

const WS0638003_FormatQueryAction = {
    getDataFormatQuery(data) {
        return WS0638003_FormatQueryService.getDataFormatQueryService(data)
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

    getDataFormatContent(data) {
        return WS0638003_FormatQueryService.getDataFormatContentService(data)
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
export default WS0638003_FormatQueryAction;