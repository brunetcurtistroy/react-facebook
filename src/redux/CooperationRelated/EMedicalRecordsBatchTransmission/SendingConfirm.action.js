import SendingConfirmService from "services/CooperationRelated/EMedicalRecordsBatchTransmission/SendingConfirmService";


const SendingConfirmAction = {
    onTransmiss(data) {
      return SendingConfirmService.onTransmiss(data)
    } 
  }
  
  export default SendingConfirmAction;