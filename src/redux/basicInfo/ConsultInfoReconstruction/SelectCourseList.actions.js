import SelectCourseListService from 'services/basicInfo/ConsultInfoReconstruction/SelectCourseListService'
import { message } from "antd";

const SelectCourseListAction = {
    GetListData(data) {
        return SelectCourseListService.GetListData(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
            message.error(err.response.data.message);
            console.log(err.response.data.message);
        });
    } ,
    ConfirmBtn(data) {
        return SelectCourseListService.ConfirmBtn(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
            message.error(err.response.data.message);
            console.log(err.response.data.message);
        });
    } 
};
export default SelectCourseListAction;