import { message } from "antd";
import CopyStartDateService from "services/basicInfo/SetInfoMaintain/CopyStartDateService";

const CopyStartDateAction = {  
    CopyStartDate(data) {
      return CopyStartDateService.CopyStartDate(data)
    }
  }
  
  export default CopyStartDateAction;