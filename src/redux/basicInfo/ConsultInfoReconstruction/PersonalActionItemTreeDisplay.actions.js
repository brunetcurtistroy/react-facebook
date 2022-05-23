
import PersonalActionItemTreeDisplayService from 'services/basicInfo/ConsultInfoReconstruction/PersonalActionItemTreeDisplayService'
import { message } from "antd";

const PersonalActionItemTreeDisplayAction = {
    GetListData(data) {
        return PersonalActionItemTreeDisplayService.GetListData(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
            message.error(err.response.data.message);
            console.log(err.response.data.message);
        });
    } ,
    NodeMovement(data) {
        return PersonalActionItemTreeDisplayService.NodeMovement(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
            message.error(err.response.data.message);
            console.log(err.response.data.message);
        });
    } 
};
export default PersonalActionItemTreeDisplayAction;