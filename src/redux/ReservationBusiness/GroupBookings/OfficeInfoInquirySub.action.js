import OfficeInfoInquirySubService from "services/ReservationBusiness/GroupBookings/OfficeInfoInquirySubService";
import { message } from "antd";

const OfficeInfoInquirySubAction = {
    getOfficeInfoInquirySub(data) {
        return OfficeInfoInquirySubService.getOfficeInfoInquirySub(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
};

export default OfficeInfoInquirySubAction;