import DetailsExtractService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/DetailsExtractService";
import { message } from "antd";
const DetailsExtractAction = {
    GetScreenData(data) {
        return DetailsExtractService.GetScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Run_F12(data) {
        return DetailsExtractService.Run_F12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }  
}
export default DetailsExtractAction;