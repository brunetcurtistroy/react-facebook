import { message } from "antd";
import IntroduceLetterExtractMaintainService from "services/IntroductionLetter/IntroduceLetterExtract/IntroduceLetterExtractMaintainService"
const IntroduceLetterExtractMaintainAction = {
    getScreenData(data) {
        return IntroduceLetterExtractMaintainService.getScreenData(data)
        .then(res => {
            if(res) {
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
    general_comment_code(data) {
        return IntroduceLetterExtractMaintainService.generalCommentCodeApi(data)
        .then(res => {
            if(res) {
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
    department(data) {
        return IntroduceLetterExtractMaintainService.departmentApi(data)
        .then(res => {
            if(res) {
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
    doctor_code(data) {
        return IntroduceLetterExtractMaintainService.doctorCodeApi(data)
        .then(res => {
            if(res) {
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
    dblClick(data) {
        return IntroduceLetterExtractMaintainService.dblClick(data)
        .then(res => {
            if(res) {
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
    deleteData(data) {
        return IntroduceLetterExtractMaintainService.deleteData(data)
    },
    inspectinquiry(data) {
        return IntroduceLetterExtractMaintainService.inspectinquiry(data)
        .then(res => {
            if(res) {
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
    printF08After(data) {
        return IntroduceLetterExtractMaintainService.printF08After(data)
        .then(res => {
            if(res) {
                return res
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
    printF08Before(data) {
        return IntroduceLetterExtractMaintainService.printF08Before(data)
        .then(res => {
            if(res) {
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
    specifyinput(data) {
        return IntroduceLetterExtractMaintainService.specifyinput(data)
        .then(res => {
            if(res) {
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
    saveDate(data) {
        return IntroduceLetterExtractMaintainService.saveData(data)
    }
}

export default IntroduceLetterExtractMaintainAction;