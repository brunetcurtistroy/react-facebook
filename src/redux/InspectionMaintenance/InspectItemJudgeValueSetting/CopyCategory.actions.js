import CopyCategoryService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/CopyCategoryService";
import { message } from "antd";
const CopyCategoryAction = {
    GetScreenData(data) {
        return CopyCategoryService.GetScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Run_F12(data) {
        return CopyCategoryService.Run_F12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default CopyCategoryAction;