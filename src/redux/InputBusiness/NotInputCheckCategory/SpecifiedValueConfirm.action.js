import { message } from "antd";
import SpecifiedValueConfirmService from "services/InputBusiness/NotInputCheckCategory/SpecifiedValueConfirmService";

const SpecifiedValueConfirmAction = {
    getListData(data) {
        return SpecifiedValueConfirmService.ListData(data)
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

    SettingBtn(data) {
        return SpecifiedValueConfirmService.SettingBtn(data)
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
    OKbtn(data) {
        return SpecifiedValueConfirmService.OKbtn(data)
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
}

export default SpecifiedValueConfirmAction;