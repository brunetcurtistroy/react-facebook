import { message } from "antd";
import ResultTblBatchCreateService from "services/ResultOutput/ResultsTblCollectOutput/ResultTblBatchCreateService";


const ResultTblBatchCreateAction = {
    GetDataScreen(data) {
        return ResultTblBatchCreateService.getDataScreen(data)
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

    extract_F11(data) {
        return ResultTblBatchCreateService.extract_F11(data)
    },

    select_one(data) {
        return ResultTblBatchCreateService.select_one(data)
    },

    select_all(data) {
        return ResultTblBatchCreateService.select_all(data)
    },

    getNameOffice(data) {
        return ResultTblBatchCreateService.getNameOffice(data)
    },

    getNameKanshocd(data) {
        return ResultTblBatchCreateService.getNameKanshocd(data)
    },

    getNameType(data) {
        return ResultTblBatchCreateService.getNameType(data)
    },

    choice(data) {
        return ResultTblBatchCreateService.choice(data)
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

    print_F12(data) {
        return ResultTblBatchCreateService.print_F12(data)
    }
}

export default ResultTblBatchCreateAction;