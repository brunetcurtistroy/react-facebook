import { message } from "antd";
import BillingInquiryService from "services/AccountingBusiness/BillingInquiry/BillingInquiryService";

const BillingInquiryAction = {
    getScreenData(params) {
        return BillingInquiryService.getScreenData(params)
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

    getDataOnSearch(params) {
        return BillingInquiryService.getDataOnSearch(params)
    }

}
export default BillingInquiryAction;