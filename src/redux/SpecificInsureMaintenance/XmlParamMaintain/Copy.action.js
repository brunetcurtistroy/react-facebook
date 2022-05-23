import CopyService from "services/SpecificInsureMaintenance/XmlParamMaintain/CopyService"
import { message } from "antd";

const CopyXmlParamAction = {
    copyData(data) {
        return CopyService.copyDataService(data)
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
export default CopyXmlParamAction;