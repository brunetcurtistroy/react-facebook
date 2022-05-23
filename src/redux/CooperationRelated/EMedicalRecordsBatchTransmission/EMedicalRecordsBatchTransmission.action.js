import { message } from "antd";
import EMedicalRecordsBatchTransmissionService from "services/CooperationRelated/EMedicalRecordsBatchTransmission/EMedicalRecordsBatchTransmissionService";


const EMedicalRecordsBatchTransmissionAction = {
  getScreenData() {
    return EMedicalRecordsBatchTransmissionService.getScreenData()
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

  searchBtn(data) {
    return EMedicalRecordsBatchTransmissionService.searchBtn(data) 
  },

  getDataBySearch() {
    return EMedicalRecordsBatchTransmissionService.getDataBySearch()
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

  batchTransmiss(data) {
    return EMedicalRecordsBatchTransmissionService.batchTransmiss(data)
  },

  allSelect(data) {
    return EMedicalRecordsBatchTransmissionService.allSelect(data)
  },

  selectRecord(data) {
    return EMedicalRecordsBatchTransmissionService.selectRecord(data)
  }
}

export default EMedicalRecordsBatchTransmissionAction;