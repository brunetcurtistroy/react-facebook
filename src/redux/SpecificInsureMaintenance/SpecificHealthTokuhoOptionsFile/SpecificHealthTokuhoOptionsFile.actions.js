import SpecificHealthTokuhoOptionsFileService from "services/SpecificInsureMaintenance/SpecificHealthTokuhoOptionsFile/SpecificHealthTokuhoOptionsFileService";

export const getSpecificHealthTokuhoOptionsFileAction = (params) => {
    return SpecificHealthTokuhoOptionsFileService.getSpecificHealthTokuhoOptionsFileService(params)
}

export const saveAndUpdateSpecificHealthTokuhoAction = (params) => {
    return SpecificHealthTokuhoOptionsFileService.saveAndUpdateSpecificHealthTokuhoService(params)
}

export const deleteSpecificHealthTokuhoOptionsFileAction = (id) => {
    return SpecificHealthTokuhoOptionsFileService.deleteSpecificHealthTokuhoOptionsFileService(id)
}