import RetransmissionOrDeleteService from "services/CooperationRelated/EMedicalRecordsBatchTransmission/RetransmissionOrDeleteService";

const RetransmissionOrDeleteAction = {
  btnTranmiss(data) {
    return RetransmissionOrDeleteService.btnTranmiss(data)
  },

  transmissInspectResend(data) {
    return RetransmissionOrDeleteService.transmissInspectResend(data)
  },

  transmissInspectDelete(data) {
    return RetransmissionOrDeleteService.transmissInspectDelete(data)
  },

  transmissImageResend(data) {
    return RetransmissionOrDeleteService.transmissImageResend(data)
  },

  transmissImageDelete(data) {
    return RetransmissionOrDeleteService.transmissImageDelete(data)
  },
}

export default RetransmissionOrDeleteAction;