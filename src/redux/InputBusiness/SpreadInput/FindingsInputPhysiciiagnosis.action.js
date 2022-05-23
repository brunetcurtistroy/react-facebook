import { message } from "antd";
import FindingsInputPhysiciiagnosisService from "services/InputBusiness/SpreadInput/FindingsInputPhysiciiagnosisService";

const FindingsInputPhysiciiagnosisAction = {  
    GetScreenDataAction(data) {
      return FindingsInputPhysiciiagnosisService.GetScreenDataService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    GetListDataUpTableAction(data) {
        return FindingsInputPhysiciiagnosisService.GetListDataUpTableService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      GetListDataDownTableAction(data) {
        return FindingsInputPhysiciiagnosisService.GetListDataDownTableService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      SaveDataDownAction(data) {
        return FindingsInputPhysiciiagnosisService.SaveDataDownService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      DeleteDataDownAction(data) {
        return FindingsInputPhysiciiagnosisService.DeleteDataDownService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      ChangeDataAction(data) {
        return FindingsInputPhysiciiagnosisService.ChangeDataService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      exitAction(data) {
        return FindingsInputPhysiciiagnosisService.exitService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
          });
      },
  }
  
  export default FindingsInputPhysiciiagnosisAction;