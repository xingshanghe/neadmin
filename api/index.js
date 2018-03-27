import consts from '~/utils/consts.js';
import axios from 'axios';
import qs from 'qs';

export default function({url, data}) {
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return axios({
    url: consts.API_URL + url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    data: qs.stringify(data)
  });
};
