import { message } from "antd";
import RadiographyDoctorInquiryService from "services/InputBusiness/RadiographyFindingInput/RadiographyDoctorInquiryService";

const RadiographyDoctorInquiryAction = {  
    getListDataRadiographyDoctorInquiryAction() {
      return RadiographyDoctorInquiryService.getListDataRadiographyDoctorInquiryService()
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  }
  
  export default RadiographyDoctorInquiryAction;