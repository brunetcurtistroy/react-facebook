import { message } from "antd";
import EscortDetailSubService from "services/AdvancePreparation/DocumentManageMaintain/EscortDetailSubService";

const EscortDetailSubAction = {
    getDataTable(data) {
        return EscortDetailSubService.getDataTable(data)
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

    updateRecordData(data) {
        return EscortDetailSubService.updateRecordData(data)
    },

    updateDataBtn(data) {
        return EscortDetailSubService.updateDataBtn(data)
    },

    deleteRecordData(data) {
        return EscortDetailSubService.deleteRecordData(data)
    }
}
export default EscortDetailSubAction;