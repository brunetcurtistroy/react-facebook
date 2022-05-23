import UserParamMaintainService from "services/SystemMaintenance/UserParamMaintain/UserParamMaintainService"
import { message } from "antd";

const UserParamMaintainAction = {
    getInit() {
        return UserParamMaintainService.getInit()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    },
    save(data) {
        return UserParamMaintainService.save(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }
   
}
export default UserParamMaintainAction;