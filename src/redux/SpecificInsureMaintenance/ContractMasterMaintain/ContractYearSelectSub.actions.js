
import ContractYearSelectSubService from "services/SpecificInsureMaintenance/ContractMasterMaintain/ContractYearSelectSubService"
import { message } from "antd";

const ContractYearSelectSubAction = {
    getListData() {
        return ContractYearSelectSubService.getListData()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default ContractYearSelectSubAction;