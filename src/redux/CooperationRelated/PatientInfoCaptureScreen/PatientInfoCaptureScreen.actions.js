import PatientInfoCaptureScreenService from "services/CooperationRelated/PatientInfoCaptureScreen/PatientInfoCaptureScreenService";

export const getScreenDataPatientInfoCaptureScreenAction = () => {
    return PatientInfoCaptureScreenService.getScreenDataPatientInfoCaptureScreenService()
}

export const captureF12PatientInfoCaptureScreenAction = (params) => {
    return PatientInfoCaptureScreenService.captureF12PatientInfoCaptureScreenService(params)
}