import ItemizedService from "services/AccountingBusiness/DepositWithdrawalInquiry/ItemizedService"


const ItemizedAction = {
    getScreenData(params) {
        return ItemizedService.getScreenData(params)
    },

    getDisplayData(params) {
        return ItemizedService.getDisplayData(params)
    },

    eventExpandBtn() {
        return ItemizedService.eventExpandBtn()
    },

    eventStoreBtn() {
        return ItemizedService.eventStoreBtn()
    },

    eventRearrangeBtn(params) {
        return ItemizedService.eventRearrangeBtn(params)
    },

    eventSummaryBtn(params) {
        return ItemizedService.eventSummaryBtn(params)
    },
}
export default ItemizedAction;