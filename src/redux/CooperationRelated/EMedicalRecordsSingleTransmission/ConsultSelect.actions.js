
import { message } from "antd";
import ConsultSelectService from "services/CooperationRelated/EMedicalRecordsSingleTransmission/ConsultSelectService";

const ConsultSelectAction = {
    GetListData(params) {
        return ConsultSelectService.GetListData(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    } 
}
export default ConsultSelectAction;