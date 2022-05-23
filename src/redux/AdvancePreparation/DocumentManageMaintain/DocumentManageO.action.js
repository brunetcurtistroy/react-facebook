import { message } from "antd";
import DocumentManageOService from "services/AdvancePreparation/DocumentManageMaintain/DocumentManageOService";

const DocumentManageOAction = {
    getScreenData(data) {
        return DocumentManageOService.getScreenData(data)
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
export default DocumentManageOAction;