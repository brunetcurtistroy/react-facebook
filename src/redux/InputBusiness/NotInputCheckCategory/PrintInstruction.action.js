import { message } from "antd";
import PrintInstructionService from "services/InputBusiness/NotInputCheckCategory/PrintInstructionService";

const PrintInstruction = {
    GetScreenData(data) {
    return PrintInstructionService.GetScreenData(data)
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
    
}

export default PrintInstructionService;
