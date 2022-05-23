import ReservesBulkChangesService from "services/ReservationBusiness/ReservesBulkChanges/ReservesBulkChangesService";

export const getScreenReservesBulkChangesAction = () => {
    return ReservesBulkChangesService.getScreenReservesBulkChangesService()
}

export const ExtractAction = (params) => {
    return ReservesBulkChangesService.ExtractService(params)
}

export const InspectChanges_F09_01Action = () => {
    return ReservesBulkChangesService.InspectChanges_F09_01Service()
}

export const InspectChanges_F09_02Action = (params) => {
    return ReservesBulkChangesService.InspectChanges_F09_02Service(params)
}

export const Cancel_F10_01Action = () => {
    return ReservesBulkChangesService.Cancel_F10_01Service()
}

export const Cancel_F10_02Action = (params) => {
    return ReservesBulkChangesService.Cancel_F10_02Service(params)
}

export const ReserveChange_F11_01Action = () => {
    return ReservesBulkChangesService.ReserveChange_F11_01Service()
}

export const ReserveChange_F11_02Action = (params) => {
    return ReservesBulkChangesService.ReserveChange_F11_02Service(params)
}

export const GetNameOfficeCodeAction = (params) => {
    return ReservesBulkChangesService.GetNameOfficeCodeService(params)
}

// WS2556064_ReserveChange
export const getScreenReserveChangeAction = (params) => {
    return ReservesBulkChangesService.getScreenReserveChangeService(params)
}

export const eventF12Action = (params) => {
    return ReservesBulkChangesService.eventF12Service(params)
}