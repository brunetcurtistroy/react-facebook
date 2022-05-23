import DepartmentChangeOnceService from 'services/basicInfo/DepartmentChangeOnce/DepartmentChangeOnceService'
import { message } from "antd";

const DepartmentChangeOnceAction = {
    getScreenData() {
        return DepartmentChangeOnceService.getScreenData()
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

    changeOfficeInfo(params) {
        return DepartmentChangeOnceService.changeOfficeInfo(params)
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

    displayButton(data) {
        return DepartmentChangeOnceService.displayButton(data)
    },

    getDataTableSelect() {
        return DepartmentChangeOnceService.getDataTableSelect()
    },

    allSelected(data) {
        return DepartmentChangeOnceService.allSelected(data)
    },

    selectRecord(data) {
        return DepartmentChangeOnceService.selectRecord(data)
    },

    run_F12(data) {
        return DepartmentChangeOnceService.run_F12(data)
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

    getInsuranceInfoSet(params) {
        return DepartmentChangeOnceService.getInsuranceInfoSet(params)
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

    updateInsuranceInfoSet(params) {
        return DepartmentChangeOnceService.updateInsuranceInfoSet(params)
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

    GetDataOfficeInfo(params) {
        return DepartmentChangeOnceService.GetDataOfficeInfo(params)
            .then((res) => {
                if (Array.isArray(res?.data)) {
                    return res?.data
                } else if (Array.isArray(res?.data?.data)) {
                    return res?.data?.data;
                } else {
                    return []
                }

            })
            .catch((err) => {
                const res = err.response;
                if (!res || !res.data || !res.data.message) {
                    message.error("エラーが発生しました");
                    return;
                }
                message.error(res.data.message);
            });
    }
};
export default DepartmentChangeOnceAction;