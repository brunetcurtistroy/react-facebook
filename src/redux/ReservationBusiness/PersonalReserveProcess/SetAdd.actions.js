import SetAddService from "services/ReservationBusiness/PersonalReserveProcess/SetAddService"; 

const SetAddAction = {
  Confirm(data) {
    return SetAddService.Confirm(data) 
  },
};
export default SetAddAction;