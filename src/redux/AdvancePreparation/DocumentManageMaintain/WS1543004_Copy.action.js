import { message } from "antd";
import Copy1543004Service from "services/AdvancePreparation/DocumentManageMaintain/WS1543004_CopyService";

const Copy1543004Action = {
    copyData(data) {
        return Copy1543004Service.copyDataService(data)
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
export default Copy1543004Action;