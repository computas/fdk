import _ from 'lodash';

export const API_FORM_STATUS_LAST_SAVED = 'API_FORM_STATUS_LAST_SAVED';

export function apiFormStatusLastSaved(apiId, lastSavedDate) {
  return dispatch =>
    dispatch({
      type: API_FORM_STATUS_LAST_SAVED,
      meta: {
        apiId,
        apiLastSaved: lastSavedDate
      }
    });
}

export default function apiFormStatus(state = {}, action) {
  switch (action.type) {
    case API_FORM_STATUS_LAST_SAVED:
      return {
        ...state,
        [action.meta.apiId]: {
          lastSaved: action.meta.apiLastSaved
        }
      };
    default:
      return state;
  }
}

export const getApiFormStatusById = (apiFormStatus, apiId) =>
  _.get(apiFormStatus, apiId);
