
import { message } from "antd";
import TamperProofReleaseService from "services/AccountingBusiness/BillingIntegration/TamperProofReleaseService";

const TamperProofReleaseAction = {
  F12(params) {
        return TamperProofReleaseService.F12(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    }
   
}
export default TamperProofReleaseAction;
