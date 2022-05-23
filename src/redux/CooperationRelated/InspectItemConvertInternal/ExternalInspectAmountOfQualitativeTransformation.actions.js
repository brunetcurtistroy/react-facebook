
import ExternalInspectAmountOfQualitativeTransformationService from 'services/CooperationRelated/InspectItemConvertInternal/ExternalInspectAmountOfQualitativeTransformationService'
import { message } from "antd";
const ExternalInspectAmountOfQualitativeTransformationAction = {
    GetScreenData(data) {
        return ExternalInspectAmountOfQualitativeTransformationService.GetScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    SaveData(data) {
        return ExternalInspectAmountOfQualitativeTransformationService.SaveData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } ,
    DeleteData(data) {
        return ExternalInspectAmountOfQualitativeTransformationService.DeleteData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default ExternalInspectAmountOfQualitativeTransformationAction;