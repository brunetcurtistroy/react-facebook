import InternalInspectItemSearchQueryService from "services/InspectionMaintenance/InspectItemInfoMaintain/InternalInspectItemSearchQueryService";

export const InternalInspectItemSearchQueryAction = (params) => {
    return InternalInspectItemSearchQueryService.getInternalInspectItemSearchQueryService(params)
        .then(res => {
            //console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
        })
}