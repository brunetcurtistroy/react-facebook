import { message } from "antd";
import SetIdentificationChangeService from "services/basicInfo/SetInfoMaintain/SetIdentificationChangeService";

const SetIdentificationChangeAction = {  
    SetIdentificationChange(data) {
      return SetIdentificationChangeService.SetIdentificationChange(data)
    }
  }
  
  export default SetIdentificationChangeAction;