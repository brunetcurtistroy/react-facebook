import ContractMasterMaintainService from "services/SpecificInsureMaintenance/ContractMasterMaintain/ContractMasterMaintainService"
import { message } from "antd";

const ContractMasterMaintainAction = {
    update(data) {
        return ContractMasterMaintainService.update(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    delete(data) {
        return ContractMasterMaintainService.delete(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
   
}
export default ContractMasterMaintainAction;