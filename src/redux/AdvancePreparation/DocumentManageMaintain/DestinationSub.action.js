import { message } from "antd";
import DestinationSubService from "services/AdvancePreparation/DocumentManageMaintain/DestinationSubService";

const DestinationSubAction = {
    getScreenData() {
        return DestinationSubService.getScreenDataService()
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
        return DestinationSubService.createAndUpdateDataService(data)
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
        return DestinationSubService.deleteDataService(data)
    }
}
export default DestinationSubAction;