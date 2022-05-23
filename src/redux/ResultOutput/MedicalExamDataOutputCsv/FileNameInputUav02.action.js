
import { message } from "antd";
import FileNameInputUav02Service from "services/ResultOutput/MedicalExamDataOutputCsv/FileNameInputUav02Service";

const FileNameInputUav02Action = {
    GetScreenData(data) {
        return FileNameInputUav02Service.GetScreenData(data)
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
    useaction1(data) {
        return FileNameInputUav02Service.useaction1(data)
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

export default FileNameInputUav02Action;