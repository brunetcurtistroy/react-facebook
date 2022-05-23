import axios from "configs/axios";

const API_LIST = {
  getInsuranceCardInquiry: "/api/group-bookings/InsuranceCardInquiry", 
};

const InsuranceCardInquiryService = {
  async getDataInsuranceCardInquiry(params) {
    return axios.get(API_LIST.getInsuranceCardInquiry, {params} );
  },
};

export default InsuranceCardInquiryService;
