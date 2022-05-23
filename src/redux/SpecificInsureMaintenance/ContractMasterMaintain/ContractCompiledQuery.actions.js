import ContractCompiledQueryService from "services/SpecificInsureMaintenance/ContractMasterMaintain/ContractCompiledQueryService"
import { message } from "antd";

const ContractCompiledQueryAction = {
    getListData(data) {
        return ContractCompiledQueryService.getListData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default ContractCompiledQueryAction;