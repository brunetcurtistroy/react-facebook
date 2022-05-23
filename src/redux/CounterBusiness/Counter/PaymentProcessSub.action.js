import PaymentProcessSubService from "services/CounterBusiness/Counter/PaymentProcessSubService"
import { message } from "antd";

const PaymentProcessSubAction = {
    getScreenData(data) {
        return PaymentProcessSubService.getScreenData(data)
           
    },
    confirmF12(data) {
        return PaymentProcessSubService.confirmF12(data)
    },
    payDateCharChange(data) {
        return PaymentProcessSubService.payDateCharChange(data).then((res) => {
            return res?.data;
        })
            .catch((err) => {
                message.error(err.response.data.message);
            });

    },
    split(data) {
        return PaymentProcessSubService.split(data).then((res) => {
            return res?.data;
        })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    }

}
export default PaymentProcessSubAction;