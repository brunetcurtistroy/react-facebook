import { message } from "antd";
import ConsultInfoListService from "services/AdvancePreparation/ConsultInfoList/ConsultInfoListService";
import { download_file } from "helpers/CommonHelpers";

const ConsultInfoListAction = {
    getScreenData() {
        return ConsultInfoListService.getScreenData()
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

    getDataBySearch(data) {
        return ConsultInfoListService.getDataBySearch(data)
    },

    PrintF12(data) {
        return ConsultInfoListService.PrintF12(data)
            .then((res) => {
                download_file(res)
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
export default ConsultInfoListAction;