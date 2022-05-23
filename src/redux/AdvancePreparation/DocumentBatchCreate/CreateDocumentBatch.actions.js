import { message } from "antd";
import CreateDocumentBatchService from "services/AdvancePreparation/DocumentBatchCreate/CreateDocumentBatchService";

const CreateDocumentBatchAction = {
    GetScreenData(data) {
        return CreateDocumentBatchService.GetScreenData(data)
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
    DisplayBtn(data) {
        return CreateDocumentBatchService.DisplayBtn(data)
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
    change(data) {
        return CreateDocumentBatchService.change(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
            });
    }, 
    
}
export default CreateDocumentBatchAction;