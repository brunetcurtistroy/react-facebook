import DateOfBirthInquiryService from "services/ReservationBusiness/GroupBookings/DateOfBirthInquiryService";
import { message } from "antd";

const DateOfBirthInquiryAction = {
    getDateOfBirthInquiry(data) {
        return DateOfBirthInquiryService.getDateOfBirthInquiry(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
};

export default DateOfBirthInquiryAction;