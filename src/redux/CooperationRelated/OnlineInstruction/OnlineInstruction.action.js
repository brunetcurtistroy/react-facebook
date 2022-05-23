import { message } from "antd";
import OnlineInstructionService from "services/CooperationRelated/OnlineInstruction/OnlineInstructionService";

const OnlineInstructionAction = {  
    GetListData() {
      return OnlineInstructionService.GetListData()
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
    }
  }
  
  export default OnlineInstructionAction;