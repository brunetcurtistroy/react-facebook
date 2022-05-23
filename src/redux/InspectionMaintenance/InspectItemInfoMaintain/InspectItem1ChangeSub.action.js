import InspectItem1ChangeSubService from 'services/InspectionMaintenance/InspectItemInfoMaintain/InspectItem1ChangeSubService';
import { message } from "antd";

export const InspectItem1ChangeSubAction = (InspectCode) => {
    return InspectItem1ChangeSubService.getScreenDataInspectItem1ChangeSubService(InspectCode)
}

export const registerBtnInspectItem1ChangeSubAction = (params) => {
    return InspectItem1ChangeSubService.registerBtnInspectItem1ChangeSubService(params)
}