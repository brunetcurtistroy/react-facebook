
import { message } from "antd"; 
import PatternChangeService from "services/InputBusiness/NotInputCheckCategory/PatternChangeService";

const PatternChangeAction = {
    getDataScreen() {
        return PatternChangeService.getDataScreen()
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

export default PatternChangeAction;