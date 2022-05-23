import CmtRegisterCopyService from "services/InspectionMaintenance/CmtRegisterCopy/CmtRegisterCopyService";
import { message } from "antd";
const CmtRegisterCopyAction = {
    getScreenData(params) {
        return CmtRegisterCopyService.getScreenData(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    CopyComment(params) {
        return CmtRegisterCopyService.CopyComment(params)
            .then((res) => { 
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    DeleteComment(params) {
        return CmtRegisterCopyService.DeleteComment(params)
            .then((res) => { 
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    UpdateComment(params) {
        return CmtRegisterCopyService.UpdateComment(params)
            .then((res) => { 
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
    RegisterComment(params) {
        return CmtRegisterCopyService.RegisterComment(params)
            .then((res) => { 
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }, 
     
}
export default CmtRegisterCopyAction;