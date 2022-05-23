
import { message } from "antd"; 
import QueryV4MjPrintPatametaMemService from "services/InputBusiness/NotInputCheckCategory/QueryV4MjPrintPatametaMemService";

const QueryV4MjPrintPatametaMemAction = {
    getDataTable(data) {
        return QueryV4MjPrintPatametaMemService.getDataTable(data)
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
    
    saveData(data) {
        return QueryV4MjPrintPatametaMemService.saveData(data)
    }
};

export default QueryV4MjPrintPatametaMemAction;