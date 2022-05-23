
import ApplicationInfoRegisterService from "services/ReservationBusiness/PersonalReserveProcess/ApplicationInfoRegisterService";
import { message } from "antd";
const ApplicationInfoRegisterAction = { 
    GetScreenData(data) {
    return ApplicationInfoRegisterService.GetScreenData(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => { 
        console.log(err);
      });
  },
  
  PersonalRegister(data) {
    return ApplicationInfoRegisterService.PersonalRegister(data)
  },

  Write(data) {
    return ApplicationInfoRegisterService.Write(data)
  },
}; 
export default ApplicationInfoRegisterAction;