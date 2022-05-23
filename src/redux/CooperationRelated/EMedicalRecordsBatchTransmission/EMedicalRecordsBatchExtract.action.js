import { message } from "antd";
import EMedicalRecordsBatchExtractService from "services/CooperationRelated/EMedicalRecordsBatchTransmission/EMedicalRecordsBatchExtractService";


const EMedicalRecordsBatchExtractAction = {  
    getScreenData() {
      return EMedicalRecordsBatchExtractService.getScreenData()
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

    extract(data) {
      return EMedicalRecordsBatchExtractService.extract(data)
    },

    release(data) {
        return EMedicalRecordsBatchExtractService.release(data)
      }
  }
  
  export default EMedicalRecordsBatchExtractAction;