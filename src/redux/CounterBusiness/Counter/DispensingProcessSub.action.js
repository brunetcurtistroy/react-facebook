import DispensingProcessSubService from "services/CounterBusiness/Counter/DispensingProcessSubService"
import { message } from "antd";

const DispensingProcessSubAction = {
    getScreenData(data) {
        return DispensingProcessSubService.getScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    },
    confirmF12(data) {
        return DispensingProcessSubService.confirmF12(data)
    },
    split(data) {
        return DispensingProcessSubService.split(data).then((res) => {
            return res?.data;
        })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    }

}
export default DispensingProcessSubAction;