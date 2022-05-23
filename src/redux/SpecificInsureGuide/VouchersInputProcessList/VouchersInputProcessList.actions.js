import VouchersInputProcessListService from "services/SpecificInsureGuide/VouchersInputProcessList/VouchersInputProcessListService"
import { message } from "antd";

const VouchersInputProcessListAction = {
    displayButton(data) {
        return VouchersInputProcessListService.displayButton(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
   
}
export default VouchersInputProcessListAction;