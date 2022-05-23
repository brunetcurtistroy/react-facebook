import { message } from "antd";
import EscortManageMaintainService from "services/AdvancePreparation/DocumentManageMaintain/EscortManageMaintainService";

const EscortManageMaintainAction = { 
    // Format
    getDataFormat(data) {
        return EscortManageMaintainService.getDataFormat(data)
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

    getDataChangeFormat(data) {
        return EscortManageMaintainService.getDataChangeFormat(data)
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

    createAndUpdateFormat(data) {
        return EscortManageMaintainService.createAndUpdateFormat(data)
    },

    deleteFormat(data) {
        return EscortManageMaintainService.deleteFormat(data)
    },

    // OptionInput
    getDataOptionInput(data) {
        return EscortManageMaintainService.getDataOptionInput(data) 
    },

    getDataOptionInputDetail() {
        return EscortManageMaintainService.getDataOptionInputDetail()
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

    createAndUpdateOptionInput(data) {
        return EscortManageMaintainService.createAndUpdateOptionInput(data)
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

    deleteOptionInput(data) {
        return EscortManageMaintainService.deleteOptionInput(data)
    }
}
export default EscortManageMaintainAction;