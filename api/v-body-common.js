import {getUserFromLocalStorage} from '~/utils/auth.js';

export const vBodyCommon = () => {
  let user = getUserFromLocalStorage();
  return {
    apiVersion: 'v1',
    kind: 'ServiceOrganize',
    metadata: {
      owner: user ? user.account.username : null
    }
  };
};

export default vBodyCommon();
