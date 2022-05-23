import XmlParamMaintainService from "services/SpecificInsureMaintenance/XmlParamMaintain/XmlParamMaintainService"
import { message } from "antd";

const XmlParamMaintainAction = {
    getInit() {
        return XmlParamMaintainService.getInit()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    save(data) {
        return XmlParamMaintainService.save(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    delete(data) {
        return XmlParamMaintainService.delete(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
   
}
export default XmlParamMaintainAction;