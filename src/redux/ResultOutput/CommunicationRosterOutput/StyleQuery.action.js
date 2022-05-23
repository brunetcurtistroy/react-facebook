
import { message } from "antd";
import StyleQueryService from "services/ResultOutput/CommunicationRosterOutput/StyleQueryService";

const StyleQueryAction = {
    getData() {
        return StyleQueryService.getData()
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
};

export default StyleQueryAction;