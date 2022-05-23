import { message } from "antd"; 
import OfficeInquiryService from "services/ResultOutput/ResultsTblCollectOutput/OfficeInquiryService";

const OfficeInquiryAction = {
    getListData(data) {
        return OfficeInquiryService.getListData(data)
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

export default OfficeInquiryAction;