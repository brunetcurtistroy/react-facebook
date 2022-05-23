import { message } from "antd";
import InspectItemMasterService from "services/CooperationRelated/InspectItemMaster/InspectItemMasterService";

const InspectItemMasterAction = {
  targetList() {
    return InspectItemMasterService.getTargetList()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  screenData() {
    return InspectItemMasterService.getScreenData()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  displayBtn(data) {
    return InspectItemMasterService.displayBtn(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  print_F11(data) {
    return InspectItemMasterService.print_F11(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  run_F12_Before(data) {
    return InspectItemMasterService.run_F12_Before(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  run_F12_After(data) {
    return InspectItemMasterService.run_F12_After(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  selectAll(data) {
    return InspectItemMasterService.selectAll(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  selectOne(data) {
    return InspectItemMasterService.selectOne(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  selectOne_W1_urgent_specimen_flg(data) {
    return InspectItemMasterService.SelectOne_W1_urgent_specimen_flg(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
};

export default InspectItemMasterAction;
