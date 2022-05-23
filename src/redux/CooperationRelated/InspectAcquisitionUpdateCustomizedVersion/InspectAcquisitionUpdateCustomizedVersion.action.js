
import InspectAcquisitionUpdateCustomizedVersionService 
from "services/CooperationRelated/InspectAcquisitionUpdateCustomizedVersion/InspectAcquisitionUpdateCustomizedVersion";
import { message } from "antd"; 
const InspectAcquisitionUpdateCustomizedVersionAction = {
    captureF12(data) {
        return InspectAcquisitionUpdateCustomizedVersionService.captureF12(data)
    },

    captureF12Print(data) {
        return InspectAcquisitionUpdateCustomizedVersionService.captureF12Print(data)
    },

    captureF12PrintAfter(data) {
        return InspectAcquisitionUpdateCustomizedVersionService.captureF12PrintAfter(data)
    },

    printF11(data) {
        return InspectAcquisitionUpdateCustomizedVersionService.printF11(data) 
    },
    getScreenData(data) {
        return InspectAcquisitionUpdateCustomizedVersionService.getScreenData(data)
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
    upload(data) {
        return InspectAcquisitionUpdateCustomizedVersionService.Upload(data)
        .then((res) => {
            return res?.data;
        })
    }
}

export default InspectAcquisitionUpdateCustomizedVersionAction;