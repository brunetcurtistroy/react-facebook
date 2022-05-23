import DetermineLevelModifyMasterCoerciveService from "services/InspectionMaintenance/DetermineLevelModify/DetermineLevelModifyMasterCoerciveService";
import { message } from "antd";
const DetermineLevelModifyMasterCoerciveAction = {
    GetScreenData() {
        return DetermineLevelModifyMasterCoerciveService.getScreenData()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    ListUpdate(params) {
        return DetermineLevelModifyMasterCoerciveService.ListUpdate(params)
            .then((res) => {
                return res 
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    DisplayList(params) {
        return DetermineLevelModifyMasterCoerciveService.DisplayList(params)
            .then((res) => {
                return res?.data ;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    Delete(params) {
        return DetermineLevelModifyMasterCoerciveService.Delete(params)
            .then((res) => {
                return res ;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    GetColor() {
        return DetermineLevelModifyMasterCoerciveService.GetColor()
            .then((res) => {
                return res?.data ;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
     
     
}
export default DetermineLevelModifyMasterCoerciveAction;