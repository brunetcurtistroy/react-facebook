import { message } from "antd";
import EscortInquiryService from "services/AdvancePreparation/DocumentManageMaintain/EscortInquiryService";

const EscortInquiryAction = {
    getScreenData(data) {
        return EscortInquiryService.getScreenData(data)
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
export default EscortInquiryAction;