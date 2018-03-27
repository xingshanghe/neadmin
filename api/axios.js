import consts from '~/utils/consts.js';
import axios from 'axios';
import qs from 'qs';

export default axios.create({
  baseURL: consts.API_URL,
  transformRequest: [
    (data)=>{return qs.stringify(data);}
  ],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  paramsSerializer: function(params) {
    return qs.stringify(params, {arrayFormat: 'brackets'});
  }
});
