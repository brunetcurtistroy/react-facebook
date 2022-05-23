import DeleteCategoryService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/DeleteCategoryService";
import { message } from "antd";
const DeleteCategoryAction = {
    GetScreenData(data) {
        return DeleteCategoryService.GetScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Run_F12(data) {
        return DeleteCategoryService.Run_F12(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default DeleteCategoryAction;