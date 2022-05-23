import { message } from "antd";
import ItemCheckupsForXml1315003Service from "services/SpecificInsureMaintenance/XmlParamMaintain/WS1315003_ItemCheckupsForXmlService";

const ItemCheckupsForXml1315003Action = {
    getScreenData() {
        return ItemCheckupsForXml1315003Service.getScreenDataService()
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
export default ItemCheckupsForXml1315003Action;