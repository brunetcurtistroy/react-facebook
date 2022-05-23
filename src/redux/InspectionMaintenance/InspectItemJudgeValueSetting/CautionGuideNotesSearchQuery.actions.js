import CautionGuideNotesSearchQueryService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/CautionGuideNotesSearchQueryService";
import { message } from "antd";
const CautionGuideNotesSearchQueryAction = {
    GetScreenData() {
        return CautionGuideNotesSearchQueryService.GetScreenData()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    GetDataDetail(params) {
        return CautionGuideNotesSearchQueryService.GetDataDetail(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    
}
export default CautionGuideNotesSearchQueryAction;