import ItemConvertCodeTblMaintainService from "services/SpecificInsureMaintenance/XmlParamMaintain/ItemConvertCodeTblMaintainService"
import { message } from "antd";

const ItemConvertCodeTblMaintainAction = {
    GetInit() {
        return ItemConvertCodeTblMaintainService.getInit()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Save(data) {
        return ItemConvertCodeTblMaintainService.save(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Delete(data) {
        return ItemConvertCodeTblMaintainService.delete(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
   
}
export default ItemConvertCodeTblMaintainAction;