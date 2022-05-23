import FormatSelectService from "services/ResultOutput/PrintParamMaintain/FormatSelectService"
import { message } from "antd";

const FormatSelectAction = {
    OpenFolder() {
        return FormatSelectService.OpenFolder()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    BackupCreate(data) {
        return FormatSelectService.BackupCreate(data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    OpeningAFile() {
        return FormatSelectService.OpeningAFile()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
}
export default FormatSelectAction;