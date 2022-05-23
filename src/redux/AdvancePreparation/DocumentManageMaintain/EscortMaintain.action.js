import { message } from "antd";
import EscortMaintainService from "services/AdvancePreparation/DocumentManageMaintain/EscortMaintainService";

const EscortMaintainAction = {
    getDataTable() {
        return EscortMaintainService.getDataTable()
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

    createAndUpdateData(data) {
        return EscortMaintainService.createAndUpdateData(data)
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

    deleteData(data) {
        return EscortMaintainService.deleteData(data)
    }
}
export default EscortMaintainAction;