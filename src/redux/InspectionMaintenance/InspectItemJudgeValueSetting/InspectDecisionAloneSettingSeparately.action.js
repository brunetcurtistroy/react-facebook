import InspectDecisionAloneSettingSeparatelyService from "services/InspectionMaintenance/InspectItemJudgeValueSetting/InspectDecisionAloneSettingSeparatelyService";
import { message } from "antd";
const InspectDecisionAloneSettingSeparatelyAction = {
    GetScreenData(data) {
        return InspectDecisionAloneSettingSeparatelyService.GetScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    GetDataDetail(params) {
        return InspectDecisionAloneSettingSeparatelyService.GetDataDetail(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    UpdateDataList(params) {
        return InspectDecisionAloneSettingSeparatelyService.UpdateDataList(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    UpdateScreenData(params) {
        return InspectDecisionAloneSettingSeparatelyService.UpdateScreenData(params)
            .then((res) => {
               return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Gzoom_EffectiveDateChar(params) {
        return InspectDecisionAloneSettingSeparatelyService.Gzoom_EffectiveDateChar(params)
            .then((res) => {
               return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    GetScreenData364(params) {
        return InspectDecisionAloneSettingSeparatelyService.GetScreenData364(params)
            .then((res) => {
               return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    GetDataDetail364(params) {
        return InspectDecisionAloneSettingSeparatelyService.GetDataDetail364(params)
            .then((res) => {
               return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    Gzoom_EffectiveDateChar364(params) {
        return InspectDecisionAloneSettingSeparatelyService.Gzoom_EffectiveDateChar364(params)
            .then((res) => {
               return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    UpdateDataList364(data) {
        return InspectDecisionAloneSettingSeparatelyService.UpdateDataList364(data)
            .then((res) => {
               return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
     
}
export default InspectDecisionAloneSettingSeparatelyAction;