import PersonalNumberMigrationService from "services/basicInfo/PersonalNumberMigration/PersonalNumberMigrationService";

// WS0401001_PersonalNumberMigration
export const getScreenDataAction = (params) => {
    return PersonalNumberMigrationService.getScreenDataService(params)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.data.message;
        })
}

export const buttonF12Action = (params) => {
    return PersonalNumberMigrationService.buttonF12Service(params)
}

// WS0252001_OfficeSpecialMaintain
export const officeSpecialMaintainSaveButtonAction = (params) => {
    return PersonalNumberMigrationService.officeSpecialMaintainSaveButtonService(params);
}

export const getDataOfficeSpecialMaintainAction = (params) => {
    return PersonalNumberMigrationService.getDataOfficeSpecialMaintainService(params);
}

export const deleteDataOfficeSpecialMaintainAction = (params) => {
    return PersonalNumberMigrationService.deleteDataOfficeSpecialMaintainService(params);
}

// WS0251003_OfficeSpecialDisplay
export const getOfficeSpecialDisplayAction = (params) => {
    return PersonalNumberMigrationService.getOfficeSpecialDisplayService(params)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.data.message;
        })
}
