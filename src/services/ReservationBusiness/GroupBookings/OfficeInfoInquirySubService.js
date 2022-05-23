import axios from "configs/axios";

const API_LIST = {
  getOfficeInfoInquirySub: "/api/group-bookings/OfficeInfoInquirySub", 
};

const OfficeInfoInquirySubService = {
  async getOfficeInfoInquirySub(params) {
    return axios.get(API_LIST.getOfficeInfoInquirySub, {params} );
  },
};

export default OfficeInfoInquirySubService;
