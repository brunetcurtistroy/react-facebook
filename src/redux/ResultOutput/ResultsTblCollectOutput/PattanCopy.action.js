import { message } from "antd";
import PattanCopyService from "services/ResultOutput/ResultsTblCollectOutput/PattanCopyService";

const PattanCopyAction = {
    getDataScreen(data) {
        return PattanCopyService.getDataScreen(data)
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

    run_F12(data) {
        return PattanCopyService.run_F12(data)
    }
}

export default PattanCopyAction;