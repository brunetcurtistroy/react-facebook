import { message } from "antd";
import AcquireSettingSubService from "services/CooperationRelated/InspectAcquisitionUpdateCustomizedVersion/AcquireSettingSubService";

const AcquireSettingSubAction = {
    getDataScreen(data) {
        return AcquireSettingSubService.getDataScreen(data)
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
    },

    updateData(data) {
        return AcquireSettingSubService.updateData(data) 
    }
}

export default AcquireSettingSubAction;