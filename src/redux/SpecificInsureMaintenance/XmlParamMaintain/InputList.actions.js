import InputListService from  "services/SpecificInsureMaintenance/XmlParamMaintain/InputListService"
import { message } from "antd";

const InputListAction = {
    getInit(data) {
        return InputListService.getInit(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Save(data) {
        return InputListService.save(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } ,
    Delete(data) {
        return InputListService.Delete(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
   
}
export default InputListAction;