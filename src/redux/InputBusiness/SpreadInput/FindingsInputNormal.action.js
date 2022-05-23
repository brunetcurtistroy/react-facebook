import { message } from "antd";
import FindingsInputNormalService from "services/InputBusiness/SpreadInput/FindingsInputNormalService";

const FindingsInputNormalAction = {  
    GetScreenDataAction(data) {
      return FindingsInputNormalService.GetScreenDataService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    GetListDataUpTableAction(data) {
        return FindingsInputNormalService.GetListDataUpTableService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      SaveDataUpAction(data) {
        return FindingsInputNormalService.SaveDataUpService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      DeleteDataUpAction(data) {
        return FindingsInputNormalService.DeleteDataUpService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      GetListDataDownTableAction(data) {
        return FindingsInputNormalService.GetListDataDownTableService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      PreviousDoF11Action(data) {
        return FindingsInputNormalService.PreviousDoF11Service(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      f7Action(data) {
        return FindingsInputNormalService.F7Service(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      ChangeCategoryJudgeAction(data) {
        return FindingsInputNormalService.ChangeCategoryJudgeService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
  }
  
  export default FindingsInputNormalAction;