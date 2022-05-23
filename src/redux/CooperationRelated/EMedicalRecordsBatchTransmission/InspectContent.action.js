import { message } from "antd";
import InspectContentService from "services/CooperationRelated/EMedicalRecordsBatchTransmission/InspectContentService";



const InspectContentAction = {
    getListData(data) {
      return InspectContentService.getListData(data)
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
  
  export default InspectContentAction;