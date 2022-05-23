import { message } from "antd";
import RadiographyFindingInputService from "services/InputBusiness/RadiographyFindingInput/RadiographyFindingInputService";

const RadiographyFindingInputAction = {
  getDataScreen(data) {
    return RadiographyFindingInputService.getDataScreen(data)
  },

  retrieval(data) {
    return RadiographyFindingInputService.retrieval(data)
  },

  getDataTable(data) {
    return RadiographyFindingInputService.getDataTable(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  selectExpression_48(data) {
    return RadiographyFindingInputService.selectExpression_48(data)
  },

  updateSubEvent(data) {
    return RadiographyFindingInputService.updateSubEvent(data)
  },

  deleteSubEvent(data) {
    return RadiographyFindingInputService.deleteSubEvent(data)
  },

  updateData(data) {
    return RadiographyFindingInputService.updateData(data)
  },
}

export default RadiographyFindingInputAction;