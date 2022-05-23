import AddInspectDetailedInputService from "services/SpecificInsureMaintenance/ContractMasterMaintain/AddInspectDetailedInputService"
import { message } from "antd";

const AddInspectDetailedInputAction = {
    getListData(data) {
        return AddInspectDetailedInputService.getListData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } ,
    save(data) {
        return AddInspectDetailedInputService.save(data)
            .then((res) => { 
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default AddInspectDetailedInputAction;