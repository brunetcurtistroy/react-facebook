import PatientInfoQueryStardService from "services/basicInfo/PersonalInfoMaintain/PatientInfoQueryStardService"

export const getListDataPatientInfoQueryStardAction = (params) => {
    return PatientInfoQueryStardService.getListDataPatientInfoQueryStardService(params)
}

export const deleteDataPatientInfoQueryStardAction = (params) => {
    return PatientInfoQueryStardService.deleteDataPatientInfoQueryStardService(params)
}