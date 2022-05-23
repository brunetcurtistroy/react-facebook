import { message } from "antd";
import AssociateInsureRequiredItemService from "services/AssociationHealthInsuranceReport/AssociateInsureRequiredItem/AssociateInsureRequiredItemService";

const AssociateInsureRequiredItemAction = {  
    RunButton(data) {
      return AssociateInsureRequiredItemService.RunButton(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  }
  
  export default AssociateInsureRequiredItemAction;