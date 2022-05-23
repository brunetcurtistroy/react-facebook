import InstructionDivisionMaintainService from "services/ResultOutput/PrintParamMaintain/InstructionDivisionMaintainService"
import { message } from "antd";

const InstructionDivisionMaintainAction = {
    comboBoxSelectSubroutine(data) {
        return InstructionDivisionMaintainService.comboBoxSelectSubroutine(data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    copyLocalCreated(data) {
        return InstructionDivisionMaintainService.copyLocalCreated(data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    attachedOverwrite(data) {
        return InstructionDivisionMaintainService.attachedOverwrite(data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    getScreenData(data) {
        return InstructionDivisionMaintainService.getScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                const res = err.response;
                if (!res || !res.data || !res.data.message) {
                    message.error("エラーが発生しました");
                    return;
                }
                message.error(res.data.message);
            });
    },
    saveData(data) {
        return InstructionDivisionMaintainService.saveData(data)
    },
    deleteData(data) {
        return InstructionDivisionMaintainService.deleteData(data)
    },
    getItemMaintenance(data){
        return InstructionDivisionMaintainService.getItemMaintenance(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                const res = err.response;
                if (!res || !res.data || !res.data.message) {
                    message.error("エラーが発生しました");
                    return;
                }
                message.error(res.data.message);
            });
    },
    saveItemMaintenance(data) {
        return InstructionDivisionMaintainService.saveItemMaintenance(data)
    },
    deleteItemMaintenance(data) {
        return InstructionDivisionMaintainService.deleteItemMaintenance(data)
    },
    copyctrlshiftc(data) {
        return InstructionDivisionMaintainService.copyctrlshiftc(data)
    },
    attachedctrlshiftv(data) {
        return InstructionDivisionMaintainService.attachedctrlshiftv(data)
    },
}
export default InstructionDivisionMaintainAction;