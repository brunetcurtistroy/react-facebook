
import { message } from "antd";
import InputVoteResultInputInspectInputService from "services/InputBusiness/NotInputCheckCategory/InputVoteResultInputInspectInputService";

const InputVoteResultInputInspectInputAction = {
    getDataScreen(data) {
        return InputVoteResultInputInspectInputService.getDataScreen(data)
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
    index(data) {
        return InputVoteResultInputInspectInputService.index(data)
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

    findingsEditing(data) {
        return InputVoteResultInputInspectInputService.findingsEditing(data)
    },

    findingsEditingAfter(data) {
        return InputVoteResultInputInspectInputService.findingsEditingAfter(data)
    },

    findingsEditingAfter274(data) {
        return InputVoteResultInputInspectInputService.findingsEditingAfter274(data)
    },

    saveData(data) {
        return InputVoteResultInputInspectInputService.saveData(data)
    },

    controlpreffit(data) {
        return InputVoteResultInputInspectInputService.controlpreffit(data)
    },

    specifiedValue(data) {
        return InputVoteResultInputInspectInputService.specifiedValue(data)
    },

};

export default InputVoteResultInputInspectInputAction;