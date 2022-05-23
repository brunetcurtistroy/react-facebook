import UseInspectCategoryService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/UseInspectCategoryService";
import { message } from "antd";
const UseInspectCategoryAction = {
    GetScreenData(data) {
        return UseInspectCategoryService.GetScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Run_F12(data) {
        return UseInspectCategoryService.Run_F12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default UseInspectCategoryAction;