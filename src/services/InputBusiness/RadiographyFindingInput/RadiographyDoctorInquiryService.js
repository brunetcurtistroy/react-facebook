import axios from "configs/axios";

const apiPaths = {
    getListDataRadiographyDoctorInquiry : "/api/radiography-finding-input/radiography-doctor-inquiry",
};

const RadiographyDoctorInquiryService = {
  async getListDataRadiographyDoctorInquiryService() {
    return axios.get(apiPaths.getListDataRadiographyDoctorInquiry);
  }
};
  
export default RadiographyDoctorInquiryService;