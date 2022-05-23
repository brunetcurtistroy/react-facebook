import { message } from "antd";
import Copy0638007Service from "services/AdvancePreparation/DocumentManageMaintain/WS0638007_CopyService";

const Copy0638007Action = {
    copyData(data) {
        return Copy0638007Service.copyDataService(data)
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
export default Copy0638007Action;