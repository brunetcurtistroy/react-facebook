import { message } from "antd";
import WS1544002FormatQueryService from "services/AdvancePreparation/DocumentManageMaintain/WS1544002_FormatQueryService";

const WS1544002FormatQueryAction = {
    getDataFormatQuery(data) {
        return WS1544002FormatQueryService.getDataFormatQueryService(data)
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
        return WS1544002FormatQueryService.getDataFormatContentService(data)
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
export default WS1544002FormatQueryAction;