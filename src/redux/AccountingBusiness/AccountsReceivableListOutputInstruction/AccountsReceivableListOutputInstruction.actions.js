import AccountsReceivableListOutputInstructionService from "services/AccountingBusiness/AccountsReceivableListOutputInstruction/AccountsReceivableListOutputInstructionService"
import { message } from "antd";

const AccountsReceivableListOutputInstructionAction = {
  GetScreenData() {
    return AccountsReceivableListOutputInstructionService.GetScreenData()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  Csv_F11(data) {
    return AccountsReceivableListOutputInstructionService.Csv_F11(data)
  },
  Printer_F12(data) {
    return AccountsReceivableListOutputInstructionService.Printer_F12(data)
  },
}
export default AccountsReceivableListOutputInstructionAction;
