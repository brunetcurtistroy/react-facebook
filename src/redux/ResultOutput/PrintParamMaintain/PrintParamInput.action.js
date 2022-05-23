import PrintParamInputService from "services/ResultOutput/PrintParamMaintain/PrintParamInputService"
import { message } from "antd";

const PrintParamInputAction = {
    getInstructionDivision(data) {
        return PrintParamInputService.getInstructionDivision(data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    getCode(data) {
        return PrintParamInputService.getCode(data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    getListData(data) {
        return PrintParamInputService.getListData(data)
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
        return PrintParamInputService.saveData(data)
    },
    deleteData(data) {
        return PrintParamInputService.deleteData(data)
    },
    getParramItem(data) {
        return PrintParamInputService.getParramItem(data)
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
    saveParramItem(data) {
        return PrintParamInputService.saveParramItem(data)
    },
    deleteParramItem(data) {
        return PrintParamInputService.deleteParramItem(data)
    },
    updatef12(data) {
        return PrintParamInputService.updatef12(data)
    },
    w1cdchange(data) {
        return PrintParamInputService.w1cdchange(data)
    },
    w1instructionsectchange(data) {
        return PrintParamInputService.w1instructionsectchange(data)
    },
    duplicationcheckf11(data) {
        return PrintParamInputService.duplicationcheckf11(data)
    },
    w1parameterchange(data) {
        return PrintParamInputService.w1parameterchange(data)
    },
    nextsearchctrln(data) {
        return PrintParamInputService.nextsearchctrln(data)
    },
    zoomw1cd(data) {
        return PrintParamInputService.zoomw1cd(data)
    },
    zoomw1cd1(data) {
        return PrintParamInputService.zoomw1cd1(data)
    },
}
export default PrintParamInputAction;