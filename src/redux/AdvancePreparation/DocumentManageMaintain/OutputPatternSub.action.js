import { message } from "antd";
import OutputPatternSubService from "services/AdvancePreparation/DocumentManageMaintain/OutputPatternSubService";

const OutputPatternSubAction = {
    getDataOutputPattern() {
        return OutputPatternSubService.getDataOutputPattern()
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

    createAndUpdateOutputPattern(data) {
        return OutputPatternSubService.createAndUpdateOutputPattern(data)
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

    deleteOutputPattern(data) {
        return OutputPatternSubService.deleteOutputPattern(data)
    },

    changeTarget(data) {
        return OutputPatternSubService.changeTarget(data)
    },

    getDataDetail(data) {
        return OutputPatternSubService.getDataDetail(data)
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

    updateDetail(data) {
        return OutputPatternSubService.updateDetail(data)
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
}
export default OutputPatternSubAction;