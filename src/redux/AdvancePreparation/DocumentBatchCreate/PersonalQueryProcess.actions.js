import { message } from "antd";
import PersonalQueryProcessService from "services/AdvancePreparation/DocumentBatchCreate/PersonalQueryProcessService";

const PersonalQueryProcessAction = {
    GetListData(data) {
        return PersonalQueryProcessService.GetListData(data)
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
}
export default PersonalQueryProcessAction;