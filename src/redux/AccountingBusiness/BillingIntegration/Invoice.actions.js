
import { message } from "antd";
import InvoiceService from "services/AccountingBusiness/BillingIntegration/InvoiceService";

const InvoiceAction = {
  GetScreenData(params) {
        return InvoiceService.GetScreenData(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    }
   
}
export default InvoiceAction;
