
import { message } from "antd"; 
import QueryNameOfDiseaseService from "services/InputBusiness/NotInputCheckCategory/QueryNameOfDiseaseService";

const QueryNameOfDiseaseAction = {
    getDataScreen(data) {
        return QueryNameOfDiseaseService.getDataScreen(data)
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

export default QueryNameOfDiseaseAction;