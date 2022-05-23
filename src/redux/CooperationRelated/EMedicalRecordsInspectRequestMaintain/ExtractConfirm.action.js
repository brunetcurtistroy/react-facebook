import ExtractConfirmService from "services/CooperationRelated/EMedicalRecordsInspectRequestMaintain/ExtractConfirmService";

const ExtractConfirmAction = { 
    request_F11(params) {
        return ExtractConfirmService.request_F11(params)
    }, 

    extract_F12(params) {
        return ExtractConfirmService.extract_F12(params)
    }, 
   
}
export default ExtractConfirmAction;