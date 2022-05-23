import PatientInquiryService from "services/CooperationRelated/PatientInfoCaptureScreen/PatientInquiryService";

export const getDataPatientInquiryAction = (params) => {
    return PatientInquiryService.getDataPatientInquiryService(params)
}