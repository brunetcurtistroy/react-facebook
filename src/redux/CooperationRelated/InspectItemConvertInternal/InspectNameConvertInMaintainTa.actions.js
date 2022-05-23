import InspectNameConvertInMaintainTaService from 'services/CooperationRelated/InspectItemConvertInternal/InspectNameConvertInMaintainTaService'
import { message } from "antd";

const InspectNameConvertInMaintainTaAction = {
  index() {
    return InspectNameConvertInMaintainTaService.index()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  save(data) {
    return InspectNameConvertInMaintainTaService.save(data);
  },
  delete(data) {
    return InspectNameConvertInMaintainTaService.delete(data);
  }

}
export default InspectNameConvertInMaintainTaAction;
