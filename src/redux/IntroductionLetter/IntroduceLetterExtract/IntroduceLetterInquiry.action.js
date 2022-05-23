import { message } from "antd";
import IntroduceLetterInquiryService from "services/IntroductionLetter/IntroduceLetterExtract/IntroduceLetterInquiryService"
const IntroduceLetterInquiryAction = {
    getListData(data) {
        return IntroduceLetterInquiryService.introduceLetterInquiry(data)
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
  
}

export default IntroduceLetterInquiryAction;