import _ from 'lodash';
import vbody from '~/api/v-body-common.js';
// mport requests from '~/utils/requests.js';
import consts from '~/utils/consts.js';
import axios from 'axios';

export default function({spec, metadata}) {
  // 组装data
  let data = _.merge(vbody, {
    metadata,
    spec
  });
  return axios({
    url: consts.CMOP_API_URL,
    method: 'POST',
    data: data
  });
};
