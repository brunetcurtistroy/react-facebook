import AcceptanceNumberSelectService from 'services/basicInfo/ConsultInfoReconstruction/AcceptanceNumberSelectService'
import { message } from "antd";

const AcceptanceNumberSelectAction = {
    GetListData(data) {
        console.log(data)
        return AcceptanceNumberSelectService.GetListData(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
     
};
export default AcceptanceNumberSelectAction;