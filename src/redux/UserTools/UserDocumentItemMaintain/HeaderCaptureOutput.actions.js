import HeaderCaptureOutputService from "services/UserTools/UserDocumentItemMaintain/HeaderCaptureOutputService";

export const getScreenDataAction = () => {
    return HeaderCaptureOutputService.getScreenDataService()
}

export const runF10Action = (params) => {
    return HeaderCaptureOutputService.runF10Service(params)
}

export const runF11Action = (params) => {
    return HeaderCaptureOutputService.runF11Service(params)
}