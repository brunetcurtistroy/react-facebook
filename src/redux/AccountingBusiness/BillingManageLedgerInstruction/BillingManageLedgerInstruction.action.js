
import { message } from "antd";
import BillingManageLedgerInstructionService from "services/AccountingBusiness/BillingManageLedgerInstruction/BillingManageLedgerInstructionService";

const BillingManageLedgerInstructionAction = {
  GetScreenData(params) {
    return BillingManageLedgerInstructionService.GetScreenData(params)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  Output_F12(params) {
    return BillingManageLedgerInstructionService.Output_F12(params)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }

}
export default BillingManageLedgerInstructionAction;
