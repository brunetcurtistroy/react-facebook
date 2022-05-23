import CalculateFormulaInputService from "services/InspectionMaintenance/InspectValueCalculateAutoMaintain/CalculateFormulaInputService";
import { message } from "antd";
const CalculateFormulaInputAction = {
    GetListData(params) {
        return CalculateFormulaInputService.GetListData(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    RegisterBtn(params) {
        return CalculateFormulaInputService.RegisterBtn(params)
            .then((res) => { 
                return res?.data ;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
}
export default CalculateFormulaInputAction;