import InputService from  "services/SpecificInsureMaintenance/XmlParamMaintain/InputService"
import { message } from "antd";

const InputAction = {
    GetInit(data) {
        return InputService.getInit(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    GetOptionInput(data) {
        return InputService.getOptionInput(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Save(data) {
        return InputService.save(data)
            .then((res) => {
                return res?.data 
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Delete(data) {
        return InputService.delete(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } ,
    DeleteOption(data) {
        return InputService.deleteOption(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } ,
    SaveOption(data) {
        return InputService.saveOption(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } ,
}
export default InputAction;