import StyleQueryService from "services/ResultOutput/PrintParamMaintain/PrintParramInputOutput/StyleQueryService"
import { message } from "antd";

const StyleQueryAction = {
    getScreenData() {
        return StyleQueryService.getScreenData()
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
export default StyleQueryAction;