import { message } from "antd";
import NotInputCheckMaintainService from "services/InputBusiness/NotInputCheckCategory/NotInputCheckMaintainService";

const NotInputCheckMaintainAction = {
    getTreeData(params) {
        return NotInputCheckMaintainService.GetTreeData(params)
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
    getPatternF8(params) {
        return NotInputCheckMaintainService.patternF8(params)
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
    clickData(data) {
        return NotInputCheckMaintainService.ClickData(data)
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
    generateData(data) {
        return NotInputCheckMaintainService.GenerateData(data)
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
    saveTypeMaintenance(data) {
        return NotInputCheckMaintainService.SaveTypeMaintenance(data).then()
        .catch((err) => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
                message.error("エラーが発生しました");
                return;
            }
            message.error(res.data.message);
        });
    },
    typeMaintenance(data) {
        return NotInputCheckMaintainService.TypeMaintenance(data)
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
    getCategoryDisplayMaintaince(data) {
        return NotInputCheckMaintainService.CategoryDisplayMaintaince(data)
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
    saveCategoryDisplayMaintaince(data) {
    return NotInputCheckMaintainService.SaveCategoryDisplayMaintaince(data).then()
    .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
        }
        message.error(res.data.message);
    });
    },
    getUnnecessaryExamList(data) {
        return NotInputCheckMaintainService.UnnecessaryExamList(data)
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
    saveUnnecessaryExamList(data) {
        return NotInputCheckMaintainService.SaveUnnecessaryExamList(data)
        .then()
        .catch((err) => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
                message.error("エラーが発生しました");
                return;
            }
            message.error(res.data.message);
        });
    },
    deleteDataUnnecessaryExamList(data) {
        return NotInputCheckMaintainService.DeleteDataUnnecessaryExamList(data).then()
        .catch((err) => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
                message.error("エラーが発生しました");
                return;
            }
            message.error(res.data.message);
        });
    },
    deleteTypeMaintenanceByCode(data) {
        return NotInputCheckMaintainService.DeleteTypeMaintenanceByCode(data)
        .then()
        .catch((err) => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
                message.error("エラーが発生しました");
                return;
            }
            message.error(res.data.message);
        });
    }
}

export default NotInputCheckMaintainAction;