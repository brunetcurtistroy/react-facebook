import ReceiptProcessSubService from "services/CounterBusiness/Counter/ReceiptProcessSubService"
import { message } from "antd";

const ReceiptProcessSubAction = {
    getScreenData(data) {
        return ReceiptProcessSubService.getScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    getIndex(data) {
        return ReceiptProcessSubService.getIndex(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    confirmF12(data) {
        return ReceiptProcessSubService.confirmF12(data)
    },
    getOptionInspect(data) {
        return ReceiptProcessSubService.getOptionInspect(data).then((res) => {
            return res?.data;
        })
            .catch((err) => {
                message.error(err.response.data.message);
            });

    },

}
export default ReceiptProcessSubAction;