import InspectValueCalculateAutoMaintainService from "services/InspectionMaintenance/InspectValueCalculateAutoMaintain/InspectValueCalculateAutoMaintainService";
import { message } from "antd";
const InspectValueCalculateAutoMaintainAction = {
    getDataSearch(params) {
        return InspectValueCalculateAutoMaintainService.getDataSearch(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
     
}
export default InspectValueCalculateAutoMaintainAction;