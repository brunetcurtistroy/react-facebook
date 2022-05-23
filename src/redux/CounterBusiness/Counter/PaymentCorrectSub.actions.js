import PaymentCorrectSubService from "services/CounterBusiness/Counter/PaymentCorrectSubService"
import { message } from "antd";

const PaymentCorrectSubAction = {
    getIndex(data) {
        return PaymentCorrectSubService.getIndex(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    getPaymentCorectSub(data) {
        return PaymentCorrectSubService.paymentCorrectSub(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    saveAction(data) {
        return PaymentCorrectSubService.save(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    }
   
}
export default PaymentCorrectSubAction;