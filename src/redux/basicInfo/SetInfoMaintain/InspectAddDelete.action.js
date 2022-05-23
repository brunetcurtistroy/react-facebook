import InspectAddDeleteService from "services/basicInfo/SetInfoMaintain/InspectAddDeleteService";

const InspectAddDeleteAction = {  
  InspectAddDelete(data) {
      return InspectAddDeleteService.InspectAddDelete(data) 
    }
  }
  
  export default InspectAddDeleteAction;