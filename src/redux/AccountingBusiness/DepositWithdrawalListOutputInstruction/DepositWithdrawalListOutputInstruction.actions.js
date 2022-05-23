import DepositWithdrawalListOutputInstructionService from "services/AccountingBusiness/DepositWithdrawalListOutputInstruction/DepositWithdrawalListOutputInstructionService"
import { message } from "antd";

const DepositWithdrawalListOutputInstructionAction = {
  GetScreenData() {
    return DepositWithdrawalListOutputInstructionService.GetScreenData()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },

  Output_csv(params) {
    return DepositWithdrawalListOutputInstructionService.Output_csv(params)
  },

  Print_F12(params) {
    return DepositWithdrawalListOutputInstructionService.Print_F12(params)
  },
}
export default DepositWithdrawalListOutputInstructionAction;
