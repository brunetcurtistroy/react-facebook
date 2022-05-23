import SpecificHealthTokuhoParamMaintainService from "services/SpecificInsureMaintenance/SpecificHealthTokuhoParamMaintain/SpecificHealthTokuhoParamMaintainService"
import { message } from "antd";

const SpecificHealthTokuhoParamMaintainAction = {
    getInit() {
        return SpecificHealthTokuhoParamMaintainService.getInit()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    save(data) {
        return SpecificHealthTokuhoParamMaintainService.save(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },

    saveAndUpdateSpecificHealthTokuhoParamMaintainAction(params) {
        return SpecificHealthTokuhoParamMaintainService.saveAndUpdateSpecificHealthTokuhoParamMaintainService(params)
    },

    deleteSpecificHealthTokuhoParamMaintainAction(id) {
        return SpecificHealthTokuhoParamMaintainService.deleteSpecificHealthTokuhoParamMaintainService(id)
    },

    inputEventSpecificHealthTokuhoParamMaintainAction(params) {
        return SpecificHealthTokuhoParamMaintainService.inputEventSpecificHealthTokuhoParamMaintainService(params)
    }
}

export default SpecificHealthTokuhoParamMaintainAction;