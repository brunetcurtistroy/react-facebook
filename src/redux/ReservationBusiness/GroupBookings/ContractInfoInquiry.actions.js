import ContractInfoInquiryService from "services/ReservationBusiness/GroupBookings/ContractInfoInquiryService";

export const getDataContractInfoInquiryAction = (params) => {
    return ContractInfoInquiryService.getDataContractInfoInquiryService(params)
}

export const getScreenContractInfoInquiryAction = (params) => {
    return ContractInfoInquiryService.getScreenContractInfoInquiryService(params)
}

export const getDataSubContractInfoInquiryAction = (params) => {
    return ContractInfoInquiryService.getDataSubContractInfoInquiryService(params)
}