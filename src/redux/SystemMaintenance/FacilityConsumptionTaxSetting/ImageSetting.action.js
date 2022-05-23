import { message } from "antd";
import ImageSettingService from "services/SystemMaintenance/FacilityConsumptionTaxSetting/ImageSettingService";

const ImageSettingAction = {
    uploadImage(data) {
    return ImageSettingService.uploadImage(data)
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
  }
}

export default ImageSettingAction;