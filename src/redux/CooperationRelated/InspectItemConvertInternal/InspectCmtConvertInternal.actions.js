import InspectCmtConvertInternalService from 'services/CooperationRelated/InspectItemConvertInternal/InspectCmtConvertInternalService'
import { message } from "antd";

const InspectCmtConvertInternalAction = {
  index() {
    return InspectCmtConvertInternalService.index()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  save(data) {
    return InspectCmtConvertInternalService.save(data);
  },
  delete(data) {
    return InspectCmtConvertInternalService.delete(data);
  }

}
export default InspectCmtConvertInternalAction;
