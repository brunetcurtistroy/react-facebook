import GroupBookingsService from "services/ReservationBusiness/GroupBookings/GroupBookingsService";
// import { message } from "antd";

const GroupBookingsAction = {
  getScreenDataAction(params) {
    return GroupBookingsService.getScreenDataService(params)
  },
  eventExtractAction(params) {
    return GroupBookingsService.eventExtractService(params)
  },
  subExtractAction() {
    return GroupBookingsService.subExtractService()
  },
  clearAction(params) {
    return GroupBookingsService.clearService(params)
  },
  eventF12Action(params) {
    return GroupBookingsService.eventF12Service(params)
  },
  confirmCallScreenAction(params) {
    return GroupBookingsService.confirmCallScreenService(params)
  },
  selectCheckboxAction(params) {
    return GroupBookingsService.selectCheckboxService(params)
  },
  selectOneLineCheckboxAction(params) {
    return GroupBookingsService.selectOneLineCheckboxService(params)
  },
  updateDataAction(params) {
    return GroupBookingsService.updateDataService(params)
  },
  deleteDataAction(params) {
    return GroupBookingsService.deleteDataService(params)
  },
  getNameCourseCodeAction(params) {
    return GroupBookingsService.getNameCourseCodeService(params)
  },
  getNameOfficeCodeAction(params) {
    return GroupBookingsService.getNameOfficeCodeService(params)
  },
};

// WS2533001_ConfirmSub
export const getConfirmsubRecordChangingAction = (params) => {
  return GroupBookingsService.getConfirmsubRecordChangingService(params)
}

export const updateChangedAction = (params) => {
  return GroupBookingsService.updateChangedService(params)
}

export default GroupBookingsAction;
