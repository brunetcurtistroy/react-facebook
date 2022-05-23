import CopyingProcessService from  "services/SpecificInsureMaintenance/XmlParamMaintain/CopyingProcessService"
import { message } from "antd";

const CopyingProcessAction = {
    Gegister(data) {
        return CopyingProcessService.Gegister(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }  
}
export default CopyingProcessAction;