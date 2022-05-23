
import { message } from "antd";
import BillingIntegrationService from "services/AccountingBusiness/BillingIntegration/BillingIntegrationService";

const BillingIntegrationAction = {
    getInit() {
        return BillingIntegrationService.getInit()
    },

    getDataDisplay(params) {
        return BillingIntegrationService.getDataDisplay(params)
    },

    getDataDisplayAfter(params) {
        return BillingIntegrationService.getDataDisplayAfter(params)
    },

    getDataTableSub(params) {
        return BillingIntegrationService.getDataTableSub(params)
    },

    Expression_141() {
        return BillingIntegrationService.Expression_141()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    }

}
export default BillingIntegrationAction;