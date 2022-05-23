import AssociateInsureParamMaintainService from 'services/AssociationHealthInsuranceReport/AssociateInsureParamMaintain/AssociateInsureParamMaintainService'
import { message } from "antd";

const AssociateInsureParamMaintainAction = {
    getInit() {
        return AssociateInsureParamMaintainService.getInit()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    getParamCreate(data) {
        return AssociateInsureParamMaintainService.getParamCreate(data)
            .then((res) => { 
                return res?.data.message;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    input(data) {
        return AssociateInsureParamMaintainService.input(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    save(data) {
        return AssociateInsureParamMaintainService.save(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
};
export default AssociateInsureParamMaintainAction;