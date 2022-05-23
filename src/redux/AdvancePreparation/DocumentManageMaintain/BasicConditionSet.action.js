import { message } from "antd";
import BasicConditionSetService from "services/AdvancePreparation/DocumentManageMaintain/BasicConditionSetService";

const BasicConditionSetAction = {
    getConditionSet(data) {
        return BasicConditionSetService.getConditionSet(data)
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

    // inspect-category-set
    getDataInspectCategory() {
        return BasicConditionSetService.getDataInspectCategory()
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

    createAndUpdateInspectCategory(data) {
        return BasicConditionSetService.createAndUpdateInspectCategory(data)
    },

    deleteInspectCategory(data) {
        return BasicConditionSetService.deleteInspectCategory(data)
    },

    // facilities-set
    getScreenFacilities() {
        return BasicConditionSetService.getScreenFacilities()
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

    getDataFacilities() {
        return BasicConditionSetService.getDataFacilities()
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

    createAndUpdateFacilities(data) {
        return BasicConditionSetService.createAndUpdateFacilities(data)
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

    deleteFacilities(data) {
        return BasicConditionSetService.deleteFacilities(data)
    },

    // time-settings
    getDataTimeSetting() {
        return BasicConditionSetService.getDataTimeSetting()
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

    createAndUpdateTimeSetting(data) {
        return BasicConditionSetService.createAndUpdateTimeSetting(data)
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

    deleteTimeSetting(data) {
        return BasicConditionSetService.deleteTimeSetting(data)
    }
}
export default BasicConditionSetAction;