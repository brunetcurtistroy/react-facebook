import { message } from "antd";
import DepositWithdrawalInquiryService from "services/AccountingBusiness/DepositWithdrawalInquiry/DepositWithdrawalInquiryService";

const DepositWithdrawalInquiryAction = {
    getDataOnSearch(params) {
        return DepositWithdrawalInquiryService.getDataOnSearch(params)
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
export default DepositWithdrawalInquiryAction;