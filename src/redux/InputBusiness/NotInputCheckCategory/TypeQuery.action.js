
import { message } from "antd"; 
import TypeQueryService from "services/InputBusiness/NotInputCheckCategory/TypeQueryService";

const TypeQueryAction = {
    getData() {
        return TypeQueryService.getData()
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

export default TypeQueryAction;