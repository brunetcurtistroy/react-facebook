import SetCsvCreateService from "services/basicInfo/SetInfoMaintain/SetCsvCreateService";

const SetCsvCreateAction = {  
    SetCsvCreate(data) {
      return SetCsvCreateService.setCsvCreate(data)
    }
  }
  
  export default SetCsvCreateAction;