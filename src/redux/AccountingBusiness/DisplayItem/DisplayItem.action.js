import { message } from "antd";
import DisplayItemService from "services/AccountingBusiness/DisplayItem/DisplayItemService";

const DisplayItemAction = {
    getInit(params) {
        return DisplayItemService.getInit(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    }
   
}
export default DisplayItemAction;