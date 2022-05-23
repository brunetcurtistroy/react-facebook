import InspectChangeQuerySubService from "services/CounterBusiness/Counter/InspectChangeQuerySubService";


const InspectChangeQuerySubAction = {  
    GetDataTable(data) {
      return InspectChangeQuerySubService.getDataTable(data)
    }
  }
  
  export default InspectChangeQuerySubAction;