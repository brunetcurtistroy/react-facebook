import InsuranceCardInquiryService from "services/ReservationBusiness/GroupBookings/InsuranceCardInquiryService";
import { message } from "antd";

const InsuranceCardInquiryAction = {
    getDataInsuranceCardInquiry(data) {
        return InsuranceCardInquiryService.getDataInsuranceCardInquiry(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
};

export default InsuranceCardInquiryAction;