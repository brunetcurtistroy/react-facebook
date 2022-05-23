import PrintParamInputOutputService from "services/ResultOutput/PrintParamMaintain/PrintParramInputOutput/PrintParamInputOutputService"
import { message } from "antd";

const PrintParamInputOutputAction = {
    getScreenData(data) {
        return PrintParamInputOutputService.getScreenData(data)
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
    runbtn(data) {
        return PrintParamInputOutputService.runbtn(data)
    },

}
export default PrintParamInputOutputAction;