import InsurerInfoMaintainService from "services/basicInfo/InsurerInfoMaintain/InsurerInfoMaintainService";
import { InsurerInfoMaintainTypes } from "./InsurerInfoMaintain.types";
import { danger } from "../../alert/alert.actions";
import { message } from "antd";

const dispatchDangerError = (dispatch, error) => {
  dispatch(
    danger(
      error.response
        ? error.response.data
          ? error.response.data.message
          : "処理が失敗しました"
        : "エラーが発生しました"
    )
  );
};

export const situationsActions = () => {
  return (dispatch) => {
    return InsurerInfoMaintainService.getSituations()
      .then((res) => {
        // console.log('test getSituations', res.data)
        dispatch({
          type: InsurerInfoMaintainTypes.GET_SITUATIONS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatchDangerError(dispatch, error);
      });
  };
};

export const industriesActions = () => {
  return (dispatch) => {
    return InsurerInfoMaintainService.getIndustries()
      .then((res) => {
        // console.log('getIndustries', res.data)
        dispatch({
          type: InsurerInfoMaintainTypes.GET_INDUSTRIES,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatchDangerError(dispatch, error);
      });
  };
};

export const districtsActions = () => {
  return (dispatch) => {
    return InsurerInfoMaintainService.getDistricts()
      .then((res) => {
        // console.log('getDistricts', res.data)
        dispatch({
          type: InsurerInfoMaintainTypes.GET_DISTRICTS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatchDangerError(dispatch, error);
      });
  };
};

export const getDetailInsurerAction = (insurerId) => {
  return (dispatch) => {
    return InsurerInfoMaintainService.getDetailInsurerService(insurerId)
      .then((res) => {
        console.log("getDetailInsurerAction", res.data);
        dispatch({
          type: InsurerInfoMaintainTypes.GET_DETAIL_INSURER,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatchDangerError(dispatch, error);
      });
  };
};

// export const getPublics = () => {
//   return dispatch => {
//     dispatch(setCurrentPublic(''));
//     return InsurerInfoMaintainService.getPublics().then(res => {
//       const publics = res.data;
//       dispatch(setPublics(publics));

//       if (publics.length > 0) {
//         const currentPublic = publics[0];
//         const data = { public: currentPublic, city_search: '' };
//         dispatch(setCurrentPublic(currentPublic));
//         dispatch(getCities(data));
//       }
//     }).catch(err => {
//       dispatchDangerError(dispatch, err);
//     })
//   }
// }

export const getPublicScreen = () => {
  InsurerInfoMaintainService.getPublicScreen()
    .then(res => {
      return res
    }).catch(err => {
    })
}

export const getPublics = Li_public => {
  return dispatch => {
    dispatch(setCurrentPublic(''));
    return InsurerInfoMaintainService.getPublics()
      .then(res => {
        const publics = res.data;
        dispatch(setPublics(publics));

        let dataPublicScreen = ''
        InsurerInfoMaintainService.getPublicScreen()
          .then(res => {
            dataPublicScreen = res.data.PrefectureName
            if (publics.length > 0) {
              let currentPublic = ''
              if (Li_public) {
                currentPublic = Li_public;
              } else {
                currentPublic = dataPublicScreen ? dataPublicScreen : publics[0];
              }

              const data = { public: currentPublic, city_search: '' };
              dispatch(setCurrentPublic(currentPublic));
              dispatch(getCities(data));
            }
          })
          .catch((err) => {
            const res = err.response;
            if (!res || !res.data || !res.data.message) {
              message.error("エラーが発生しました");
              return;
            }
            message.error(res.data.message);
          });
      }).catch(err => {
        dispatchDangerError(dispatch, err);
      })
  }
}

export const getCities = data => {
  return dispatch => {
    dispatch(setCurrentPublic(data.public));
    return InsurerInfoMaintainService.getCities(data).then(res => {
      const data = res.data;
      const { cities } = data;
      dispatch(setCities(cities));

      if (cities.length > 0) {
        const currentCity = cities[0];
        const info = { public: data.public, city: currentCity, area_search: '' }
        dispatch(setCurrentCity(currentCity));
        dispatch(getAreas(info));
      } else {
        dispatch(setAreas([]));
      }
    }).catch(err => {
      dispatchDangerError(dispatch, err);
    })
  }
}

export const getAreas = data => {
  return dispatch => {
    dispatch(setCurrentCity(data.city));
    return InsurerInfoMaintainService.getAreas(data).then(res => {
      const data = res.data;
      const { areas } = data;
      dispatch(setAreas(areas));

      if (areas.length > 0) {
        const currentArea = areas[0];
        dispatch(setCurrentArea(currentArea));
      }
    }).catch(err => {
      dispatchDangerError(dispatch, err);
    })
  }
}

export const setPublics = publics => {
  return { type: InsurerInfoMaintainTypes.SET_PUBLICS, publics };
}

export const setCities = cities => {
  return { type: InsurerInfoMaintainTypes.SET_CITIES, cities };
}

export const setAreas = areas => {
  return { type: InsurerInfoMaintainTypes.SET_AREAS, areas };
}

export const setCurrentPublic = currentPublic => {
  return { type: InsurerInfoMaintainTypes.SET_CURRENT_PUBLIC, currentPublic }
}

export const setCurrentCity = currentCity => {
  return { type: InsurerInfoMaintainTypes.SET_CURRENT_CITY, currentCity }
}

export const setCurrentArea = currentArea => {
  return { type: InsurerInfoMaintainTypes.SET_CURRENT_AREA, currentArea }
}

export const getNameZipCodeAction = (params) => {
  return InsurerInfoMaintainService.getNameZipCodeService(params)
}
