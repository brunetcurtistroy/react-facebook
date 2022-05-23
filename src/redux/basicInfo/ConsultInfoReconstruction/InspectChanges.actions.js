import InspectChangesService from 'services/basicInfo/ConsultInfoReconstruction/InspectChangesService'
import { message } from "antd";

const InspectChangesAction = {
    GetListData(data) {
        return InspectChangesService.GetListData(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
            message.error(err.response.data.message);
            console.log(err.response.data.message);
        });
    } ,
    InspectQuery_F12(data) {
        return InspectChangesService.InspectQuery_F12(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
            message.error(err.response.data.message);
            console.log(err.response.data.message);
        });
    } 
};
export default InspectChangesAction;