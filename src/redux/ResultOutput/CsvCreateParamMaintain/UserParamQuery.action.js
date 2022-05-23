
import { message } from "antd";
import UserParamQueryService from "services/ResultOutput/CsvCreateParamMaintain/UserParamQueryService";


const UserParamQueryAction = {
    getListData(data) {
        return UserParamQueryService.getListData(data)
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
    }
};

export default UserParamQueryAction;