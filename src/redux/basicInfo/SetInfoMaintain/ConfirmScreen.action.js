
import ConfirmScreenService from "services/basicInfo/SetInfoMaintain/ConfirmScreenService";

const ConfirmScreenAction = {  
    GetDataScreen(data) {
      return ConfirmScreenService.getDataScreen(data)
    }
  }
  
  export default ConfirmScreenAction;