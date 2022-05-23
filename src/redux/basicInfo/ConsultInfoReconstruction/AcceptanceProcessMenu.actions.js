import AcceptanceProcessMenuService from 'services/basicInfo/ConsultInfoReconstruction/AcceptanceProcessMenuService'
import { message } from "antd";

const AcceptanceProcessMenuAction = {
    GetScreenData(data) {
        return AcceptanceProcessMenuService.getScreenData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    RunBtnInsuranceCardReader(data) {
        return AcceptanceProcessMenuService.RunBtnInsuranceCardReader(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    OrderTransmission(data) {
        return AcceptanceProcessMenuService.OrderTransmission(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    ConsultVotePrint(data) {
        return AcceptanceProcessMenuService.ConsultVotePrint(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    CardIssuance(data) {
        return AcceptanceProcessMenuService.CardIssuance(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
};
export default AcceptanceProcessMenuAction;