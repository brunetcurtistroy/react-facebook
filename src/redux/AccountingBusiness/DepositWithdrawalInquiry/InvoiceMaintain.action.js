import InvoiceMaintainService from "services/AccountingBusiness/DepositWithdrawalInquiry/InvoiceMaintainService";

const InvoiceMaintainAction = {
    getScreenData(params) {
        return InvoiceMaintainService.getScreenData(params)
    },

    getInitData(params) {
        return InvoiceMaintainService.getInitData(params)
    },

    getDisplayData(params) {
        return InvoiceMaintainService.getDisplayData(params)
    },

    getSubContent(params) {
        return InvoiceMaintainService.getSubContent(params)
    },

    eventGzoomDestination(params) {
        return InvoiceMaintainService.eventGzoomDestination(params)
    },

    eventF7(params) {
        return InvoiceMaintainService.eventF7(params)
    },

    eventF11(params) {
        return InvoiceMaintainService.eventF11(params)
    },

    eventF12(params) {
        return InvoiceMaintainService.eventF12(params)
    },

    eventChangeTaxCalculateUnit(params) {
        return InvoiceMaintainService.eventChangeTaxCalculateUnit(params)
    },

    eventChangeTaxClassify(params) {
        return InvoiceMaintainService.eventChangeTaxClassify(params)
    },

    eventChangeLessThanTaxCircle(params) {
        return InvoiceMaintainService.eventChangeLessThanTaxCircle(params)
    },

    saveDataSubContent(params) {
        return InvoiceMaintainService.saveDataSubContent(params)
    },
}
export default InvoiceMaintainAction;