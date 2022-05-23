import { message } from "antd";
import RadiographySubjectsServices from "services/InputBusiness/RadiographyFindingsSubmit/RadiographySubjectsServices";

const RadiographySubjectsAction = {  
  radiographySubjectAction(data) {
      return RadiographySubjectsServices.radiographySubjectService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
  }
  
  export default RadiographySubjectsAction;