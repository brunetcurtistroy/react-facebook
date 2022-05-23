import { message } from "antd";
import ItemConvertCdMaintainEService from "services/SpecificInsureMaintenance/XmlParamMaintain/ItemConvertCdMaintainEService";

const ItemConvertCdMaintainEAction = {
    getScreenData() {
        return ItemConvertCdMaintainEService.getScreenDataService()
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
        return ItemConvertCdMaintainEService.createAndUpdateDataService(data)
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
        return ItemConvertCdMaintainEService.deleteDataService(data)
    }
}
export default ItemConvertCdMaintainEAction;