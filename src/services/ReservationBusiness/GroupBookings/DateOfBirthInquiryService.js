import axios from "configs/axios";

const API_LIST = {
  getDateOfBirthInquiry: "/api/group-bookings/DateOfBirthInquiry", 
};

const DateOfBirthInquiryService = {
  async getDateOfBirthInquiry(params) {
    return axios.get(API_LIST.getDateOfBirthInquiry, {params} );
  },
};

export default DateOfBirthInquiryService;
