import BillingInquirySubService from "services/InputBusiness/ProgressSetting/BillingInquirySubService";

export const getDataBillingInquirySubSerAction = (params) => {
    return BillingInquirySubService.getDataBillingInquirySubService(params)
}

export const getListDataInvoiceSubAction = (params) => {
    return BillingInquirySubService.getListDataInvoiceSubService(params)
}

export const getListDataPaymentSubAction = (params) => {
    return BillingInquirySubService.getListDataPaymentSubService(params)
}