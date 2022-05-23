import UserOptionInfoMaintainService from "services/SystemMaintenance/UserOptionInfoMaintain/UserOptionInfoMaintainService";

export const getScreenDataUserOptionInfoMaintainAction = () => {
    return UserOptionInfoMaintainService.getScreenDataUserOptionInfoMaintainService()
}

export const getDataOptionCodeAction = (params) => {
    return UserOptionInfoMaintainService.getDataOptionCodeService(params)
}

export const getDataOptionInputAction = (params) => {
    return UserOptionInfoMaintainService.getDataOptionInputService(params)
}

export const saveOrUpdateDataOptionCodeAction = (params) => {
    return UserOptionInfoMaintainService.saveOrUpdateDataOptionCodeService(params)
}

export const saveOrUpdateDataOptionInputAction = (params) => {
    return UserOptionInfoMaintainService.saveOrUpdateDataOptionInputService(params)
}

export const deleteOptionCodeAction = (params) => {
    return UserOptionInfoMaintainService.deleteOptionCodeService(params)
}