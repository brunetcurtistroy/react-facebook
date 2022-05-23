import { message } from "antd"; 
import InspectSpecifiedService from "services/CooperationRelated/InspectAcquisitionUpdateCustomizedVersion/InspectSpecifiedService";

const InspectSpecifiedAction = {
    getDataScreen(data) {
        return InspectSpecifiedService.getDataScreen(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                const res = err.response;
                if (!res || !res.data || !res.data.message) {
                    message.error("エラーが発生しました");
                    return;
                }
                message.error(res.data.message);
            });
    }
}

export default InspectSpecifiedAction;