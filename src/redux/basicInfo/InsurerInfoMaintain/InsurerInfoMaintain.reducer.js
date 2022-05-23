import { InsurerInfoMaintainTypes } from "./InsurerInfoMaintain.types";

const INITIAL_STATE = {
  industriesList: [],
  situationsList: [],
  districtsList: [],
  insurer: {},
  publics: [],
  currentPublic: '',
  cities: [],
  currentCity: '',
  areas: [],
  currentArea: ''
};

const InsurerInfoMaintainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InsurerInfoMaintainTypes.GET_SITUATIONS:
      return {
        ...state,
        situationsList: action.payload,
      };
    case InsurerInfoMaintainTypes.GET_INDUSTRIES:
      return {
        ...state,
        industriesList: action.payload,
      };
    case InsurerInfoMaintainTypes.GET_DISTRICTS:
      return {
        ...state,
        districtsList: action.payload,
      };
    case InsurerInfoMaintainTypes.GET_DETAIL_INSURER:
      return {
        ...state,
        insurer: action.payload,
      };
    case InsurerInfoMaintainTypes.SET_PUBLICS:
      return {
        ...state,
        publics: action.publics
      };
    case InsurerInfoMaintainTypes.SET_CITIES:
      return {
        ...state,
        cities: action.cities
      };
    case InsurerInfoMaintainTypes.SET_AREAS:
      return {
        ...state,
        areas: action.areas
      };
    case InsurerInfoMaintainTypes.SET_CURRENT_PUBLIC:
      return {
        ...state,
        currentPublic: action.currentPublic
      };
    case InsurerInfoMaintainTypes.SET_CURRENT_CITY:
      return {
        ...state,
        currentCity: action.currentCity
      };
    case InsurerInfoMaintainTypes.SET_CURRENT_AREA:
      return {
        ...state,
        currentArea: action.currentArea
      };
    default:
      return state;
  }
};

export default InsurerInfoMaintainReducer;
