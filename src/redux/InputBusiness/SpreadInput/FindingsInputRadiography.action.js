import { message } from "antd";
import FindingsInputRadiographyService from "services/InputBusiness/SpreadInput/FindingsInputRadiographyService";

const FindingsInputRadiographyAction = {  
    GetScreenDataAction(data) {
      return FindingsInputRadiographyService.GetScreenDataService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    FindingsComfirmAction(data) {
        return FindingsInputRadiographyService.FindingsComfirmService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      GetListDataLeftTableAction(data) {
        return FindingsInputRadiographyService.GetListDataLeftTableService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      SaveDataLeftAction(data) {
        return FindingsInputRadiographyService.SaveDataLeftService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      DeleteDataLeftAction(data) {
        return FindingsInputRadiographyService.DeleteDataLeftService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      GetListDataRightTableAction(data) {
        return FindingsInputRadiographyService.GetListDataRightTableService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      getChangeSiteAndFindingsCodeAction(data) {
        return FindingsInputRadiographyService.getChangeSiteAndFindingsCodeService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      f7Action(data) {
        return FindingsInputRadiographyService.f7WithLiLeadershipMattersHowToAdd(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      f11Action(data) {
        return FindingsInputRadiographyService.f11Service(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      ChangeCategoryJudgeAction(data) {
        return FindingsInputRadiographyService.ChangeCategoryJudgeService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
  }
  
  export default FindingsInputRadiographyAction;