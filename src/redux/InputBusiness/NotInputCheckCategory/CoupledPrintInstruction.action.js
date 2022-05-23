import { message } from "antd";
import CoupledPrintInstructionService from "services/InputBusiness/NotInputCheckCategory/CoupledPrintInstructionService";

const CoupledPrintInstruction = {
    GetScreenData(data) {
    return CoupledPrintInstructionService.GetScreenData(data)
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
    PrintF12(data) {
    return CoupledPrintInstructionService.PrintF12(data)
      .then((res) => {
        return res;
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
}

export default CoupledPrintInstruction;
