import { message } from "antd";
import ProcessSelectQueryService from "services/CooperationRelated/OcrCaptureStartUp/ProcessSelectQueryService";


const ProcessSelectQueryAction = {
    getListData(data) {
        return ProcessSelectQueryService.getListData(data)
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

export default ProcessSelectQueryAction;