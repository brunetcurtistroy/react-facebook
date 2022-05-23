
import { message } from "antd";
import CharacterStringSearchService from "services/ResultOutput/CsvCreateParamMaintain/CharacterStringSearchService";


const CharacterStringSearchAction = {
    getSearch(data) {
        return CharacterStringSearchService.Search(data)
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

export default CharacterStringSearchAction;