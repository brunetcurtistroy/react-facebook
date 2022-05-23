import { message } from "antd";
import InspectItemMasterService from "services/SpecificInsureMaintenance/InspectItemMaster/InspectItemMasterService";

const InspectItemMasterAction = {
  getScreenData() {
    return InspectItemMasterService.getScreenData()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },

  saveAndUpdateInspectItem(data) {
    return InspectItemMasterService.saveAndUpdateInspectItem(data)
  },

  deleteInspectItem(data) {
    return InspectItemMasterService.deleteInspectItem(data)
  },
}

export default InspectItemMasterAction;