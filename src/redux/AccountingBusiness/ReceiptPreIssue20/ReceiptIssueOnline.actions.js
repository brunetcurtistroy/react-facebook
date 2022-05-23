import ReceiptIssueOnlineService from "services/AccountingBusiness/ReceiptPreIssue20/ReceiptIssueOnlineService"
import { message } from "antd";

const ReceiptIssueOnlineAction = {
    getScreenData(data) {
        return ReceiptIssueOnlineService.getScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    review(data) {
        return ReceiptIssueOnlineService.review(data)
    },
    print(data) {
        return ReceiptIssueOnlineService.print(data)
    },
   
}
export default ReceiptIssueOnlineAction;