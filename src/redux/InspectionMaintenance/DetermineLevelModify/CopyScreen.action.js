import CopyScreenService from "services/InspectionMaintenance/DetermineLevelModify/CopyScreenService";
import { message } from "antd";
const CopyScreenAction = {
    CopyScreen(data) {
        return CopyScreenService.copyScreen(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
     
}
export default CopyScreenAction;