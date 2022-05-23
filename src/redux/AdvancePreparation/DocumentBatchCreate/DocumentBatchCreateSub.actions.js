import { message } from "antd";
import DocumentBatchCreateSubService from "services/AdvancePreparation/DocumentBatchCreate/DocumentBatchCreateSubService";

const DocumentBatchCreateSubAction = {
  GetScreenData(data) {
    return DocumentBatchCreateSubService.GetScreenData(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  FromSetTable(data) {
    return DocumentBatchCreateSubService.FromSetTable(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  ChangePrint(data) {
    return DocumentBatchCreateSubService.ChangePrint(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  ChangeSpecifiedIssue(data) {
    return DocumentBatchCreateSubService.ChangeSpecifiedIssue(data)
  },
  ChangeOutputPattern(data) {
    return DocumentBatchCreateSubService.ChangeOutputPattern(data)
  },
  ChangeOutputUnit(data) {
    return DocumentBatchCreateSubService.ChangeOutputUnit(data)
  },
  PrintProcess(data) {
    return DocumentBatchCreateSubService.PrintProcess(data)
  },

}
export default DocumentBatchCreateSubAction;
