import UseInspectInquiryService from "services/ResultOutput/PrintParamMaintain/UseInspectInquiryService"
import { message } from "antd";

const UseInspectInquiryAction = {
    getScreenData(data) {
        return UseInspectInquiryService.getScreenData(data)
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
    getMaintain(data) {
        return UseInspectInquiryService.getMaintain(data)
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
}
export default UseInspectInquiryAction;