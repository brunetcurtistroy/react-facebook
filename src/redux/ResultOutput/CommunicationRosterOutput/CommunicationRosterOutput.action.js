import CommunicationRosterOutputService from "services/ResultOutput/CommunicationRosterOutput/CommunicationRosterOutputService"
import { download_file } from "helpers/CommonHelpers";
import { message } from "antd";

const CommunicationRosterOutputAction = {
  getScreenData() {
    return CommunicationRosterOutputService.getScreenData()
  },

  getDataIssueList(data) {
    return CommunicationRosterOutputService.getDataIssueList(data)
  },

  print(data) {
    return CommunicationRosterOutputService.print(data)
  },

    printAfter(data) {
        return CommunicationRosterOutputService.printAfter(data)
          .then(res => {
            download_file(res)
          }).catch(err => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
              message.error("エラーが発生しました");
              return;
            }
            message.error(res.data.message);
          });
      },

  getInfoStyle(data) {
    return CommunicationRosterOutputService.getInfoStyle(data)
  },
}
export default CommunicationRosterOutputAction;