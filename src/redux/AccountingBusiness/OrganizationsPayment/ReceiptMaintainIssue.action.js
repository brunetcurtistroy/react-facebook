import ReceiptMaintainIssueService from "services/AccountingBusiness/OrganizationsPayment/ReceiptMaintainIssueService";
import { message } from "antd";

const ReceiptMaintainIssueAction = {
  screenDataAction() {
    return ReceiptMaintainIssueService.screenDataService()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        //   message.error(err.response.data.message);
      });
  },
  displayBtnAction(data) {
    return ReceiptMaintainIssueService.displayService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  individualAction(data) {
    return ReceiptMaintainIssueService.individualService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  receiptHistoryAction() {
    return ReceiptMaintainIssueService.receiptHistoryService()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  specifiedOfficeAction(data) {
    return ReceiptMaintainIssueService.specifiedOfficeService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  selectAllAction(data) {
    return ReceiptMaintainIssueService.selectAllService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  w1TargetAction(data) {
    return ReceiptMaintainIssueService.w1TargetService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  userAction1Action(data) {
    return ReceiptMaintainIssueService.userAction1Service(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  edittingDivitionAction(data) {
    return ReceiptMaintainIssueService.edittingDivitionService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  edittingDivitionYesAction(data) {
    return ReceiptMaintainIssueService.edittingDivitionYesService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  f11Action1Action(data) {
    return ReceiptMaintainIssueService.f11Action1Service(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  f11Action2Action() {
    return ReceiptMaintainIssueService.f11Action2Service()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  DesignatedAction(data) {
    return ReceiptMaintainIssueService.DesignatedService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
};

export default ReceiptMaintainIssueAction;
