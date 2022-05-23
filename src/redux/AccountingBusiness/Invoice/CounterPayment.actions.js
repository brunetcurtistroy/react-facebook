import CounterPaymentService from "services/AccountingBusiness/Invoice/CounterPaymentService";

const CounterPaymentAction = {
    getScreenCounterPaymentAction(){
        return CounterPaymentService.getScreenCounterPaymentService()
    },
    changeBilliManagerNumCounterPaymentAction(params){
        return CounterPaymentService.changeBilliManagerNumCounterPaymentService(params)
    },
    getInfoPageCounterPaymentAction(params){
        return CounterPaymentService.getInfoPageCounterPaymentService(params)
    },
    getBillingDataDisplayCounterPaymentAction(){
        return CounterPaymentService.getBillingDataDisplayCounterPaymentService()
    },
    
}

export default CounterPaymentAction