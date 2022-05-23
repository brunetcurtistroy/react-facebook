import PaymentListOutputService from "services/AccountingBusiness/PaymentListOutput/PaymentListOutputService"
import { message } from "antd";

const PaymentListOutputAction = {
    GetScreenData() {
        return PaymentListOutputService.GetScreenData()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    Printer_F12(data) {
        return PaymentListOutputService.Printer_F12(data)
    },
}
export default PaymentListOutputAction;
