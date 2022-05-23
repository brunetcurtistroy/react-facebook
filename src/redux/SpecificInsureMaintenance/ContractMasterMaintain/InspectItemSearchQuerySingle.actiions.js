

import InspectItemSearchQuerySingleService from "services/SpecificInsureMaintenance/ContractMasterMaintain/InspectItemSearchQuerySingleService"
import { message } from "antd";

const InspectItemSearchQuerySingleAction = {
    getListData(data) {
        return InspectItemSearchQuerySingleService.getListData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    getListData034(data) {
        return InspectItemSearchQuerySingleService.getListData034(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    } 
}
export default InspectItemSearchQuerySingleAction;