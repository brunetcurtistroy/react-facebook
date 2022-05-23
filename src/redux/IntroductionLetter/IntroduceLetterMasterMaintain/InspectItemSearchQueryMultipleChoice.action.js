import { message } from "antd";
import InspectItemSearchQueryMultipleChoiceService from "services/IntroductionLetter/IntroduceLetterMasterMaintain/InspectItemSearchQueryMultipleChoiceService"
const InspectItemSearchQueryMultipleChoiceAction = {
    getScreenData(data) {
    return InspectItemSearchQueryMultipleChoiceService.getScreenData(data)
      .then(res => {
        if (res) {
          return res.data
        }
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  f11(data) {
    return InspectItemSearchQueryMultipleChoiceService.f11(data)
      .then(res => {
        if (res) {
          return res.data
        }
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  closeScreen(data) {
    return InspectItemSearchQueryMultipleChoiceService.closeScreen(data)
      .then(res => {
        if (res) {
          return res.data
        }
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  category(data) {
    return InspectItemSearchQueryMultipleChoiceService.category(data)
      .then(res => {
        if (res) {
          return res.data
        }
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  inspect(data) {
    return InspectItemSearchQueryMultipleChoiceService.inspect(data)
      .then(res => {
        if (res) {
          return res.data
        }
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  subdisplaytable(data) {
    return InspectItemSearchQueryMultipleChoiceService.subdisplaytable(data)
      .then(res => {
        if (res) {
          return res.data
        }
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  selectOne(data) {
    return InspectItemSearchQueryMultipleChoiceService.selectOne(data)
      .then(res => {
        if (res) {
          return res.data
        }
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  selectAll(data) {
    return InspectItemSearchQueryMultipleChoiceService.selectAll(data)
      .then(res => {
        if (res) {
          return res.data
        }
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
}

export default InspectItemSearchQueryMultipleChoiceAction;