import { message } from "antd";
import ItemCheckupsForXmlService from "services/SpecificInsureMaintenance/XmlParamMaintain/ItemCheckupsForXmlService";

const ItemCheckupsForXmlAction = {
    getScreenData(data) {
        return ItemCheckupsForXmlService.getScreenDataService(data)
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
export default ItemCheckupsForXmlAction;