import axios from 'axios';
import _ from 'lodash';
import { apiFormStatusLastSaved } from '../../../redux/modules/api-form-status';

export const asyncValidate = (values, dispatch, props) => {
  const { match } = props;
  return axios
    .patch(_.get(match, 'url'), values)
    .then(response => {
      if (dispatch) {
        dispatch(
          apiFormStatusLastSaved(
            _.get(response, ['data', 'id']),
            _.get(response, ['data', 'lastModified'])
          )
        );
      }
    })
    .catch(response => {
      const { error } = response;
      return Promise.reject(error);
    });
};
