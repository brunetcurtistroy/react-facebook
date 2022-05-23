import InvoiceService from "services/AccountingBusiness/Invoice/InvoiceService";

export const getScreenInvoiceAction = () => {
    return InvoiceService.getScreenInvoiceService()
}

export const DisplayBtnInvoiceAction = (params) => {
    return InvoiceService.DisplayBtnInvoiceService(params)
}

export const QueryResultsDisplayInvoiceAction = () => {
    return InvoiceService.QueryResultsDisplayInvoiceService()
}

export const OptionsDisplayInvoiceAction = () => {
    return InvoiceService.OptionsDisplayInvoiceService()
}

export const Issue_F12InvoiceAction = () => {
    return InvoiceService.Issue_F12InvoiceService()
}

export const MissingOrDeletedInvoiceAction = (params) => {
    return InvoiceService.MissingOrDeletedInvoiceService(params)
}

export const ChangeInvoiceAction = (params) => {
    return InvoiceService.ChangeInvoiceService(params)
}