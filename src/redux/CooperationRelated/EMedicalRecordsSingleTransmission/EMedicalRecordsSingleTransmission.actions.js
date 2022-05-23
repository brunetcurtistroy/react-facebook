
import { message } from "antd";
import EMedicalRecordsSingleTransmissionService from "services/CooperationRelated/EMedicalRecordsSingleTransmission/EMedicalRecordsSingleTransmissionService";

const EMedicalRecordsSingleTransmissionAction = {
    GetScreenData(params) {
        return EMedicalRecordsSingleTransmissionService.GetScreenData(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    GetDataIndex(params) {
        return EMedicalRecordsSingleTransmissionService.GetDataIndex(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    Cancel(params) {
        return EMedicalRecordsSingleTransmissionService.Cancel(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    GetListData(params) {
        return EMedicalRecordsSingleTransmissionService.GetListData(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    CancelBtn(params) {
        return EMedicalRecordsSingleTransmissionService.CancelBtn(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    F3(params) {
        return EMedicalRecordsSingleTransmissionService.F3(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    Group(params) {
        return EMedicalRecordsSingleTransmissionService.Group(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    InspectContent(params) {
        return EMedicalRecordsSingleTransmissionService.InspectContent(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    RetransmissBtn(params) {
        return EMedicalRecordsSingleTransmissionService.RetransmissBtn(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    Submit(params) {
        return EMedicalRecordsSingleTransmissionService.Submit(params)
    }, 
    AnotherDate(params) {
        return EMedicalRecordsSingleTransmissionService.AnotherDate(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
    ChangePersonalNum(params) {
        return EMedicalRecordsSingleTransmissionService.ChangePersonalNum(params)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message); 
            });
    }, 
}
export default EMedicalRecordsSingleTransmissionAction;