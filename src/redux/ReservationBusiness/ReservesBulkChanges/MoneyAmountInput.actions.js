import MoneyAmountInputService from "services/ReservationBusiness/ReservesBulkChanges/MoneyAmountInputService"

export const getScreenMoneyAmountInputAction = (params) => {
    return MoneyAmountInputService.getScreenMoneyAmountInputService(params)
}

export const taxCalculateMoneyAmountInputAction = (params) => {
    return MoneyAmountInputService.taxCalculateMoneyAmountInputService(params)
}