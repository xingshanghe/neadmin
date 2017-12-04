import consts from '~/utils/consts.js';
import Cookie from 'js-cookie';

export const vBodyCommon = () => {
  let user = JSON.parse(Cookie.get(consts.USER_KEY));
  return {
    apiVersion: 'v1',
    kind: 'ServiceOrganize',
    metadata: {
      owner: user.account.username || null
    }
  };
};

export default vBodyCommon();
