import SetIncludesQueryService from "services/ReservationBusiness/PersonalReserveProcess/SetIncludesQueryService";

export const SetIncludesQueryAction = (params) => {
    return SetIncludesQueryService.getSetIncludesQuery(params)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
            console.log(err);
        });
}