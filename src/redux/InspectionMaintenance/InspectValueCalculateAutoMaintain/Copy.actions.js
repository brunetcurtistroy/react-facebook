import CopyService from "services/InspectionMaintenance/InspectValueCalculateAutoMaintain/CopyService";
import { message } from "antd";
const CopyAction = {
    GetInit(params) {
        return CopyService.getInit(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    CopyRegister(params) {
        return CopyService.CopyRegister(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
     
}
export default CopyAction;