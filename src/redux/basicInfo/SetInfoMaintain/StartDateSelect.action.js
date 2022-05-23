import { message } from "antd";
import StartDateSelectService from "services/basicInfo/SetInfoMaintain/StartDateSelectService";

const StartDateSelectAction = {  
    StartDateSelect(data) {
      return StartDateSelectService.StartDateSelect(data)
    }
  }
  
  export default StartDateSelectAction;