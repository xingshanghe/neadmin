import {getUserFromSessionStorage} from '~/utils/auth.js';

export const vBodyCommon = () => {
  let user = getUserFromSessionStorage();
  return {
    apiVersion: 'v1',
    kind: 'ServiceOrganize',
    metadata: {
      owner: user ? user.username : null
    }
  };
};

export default vBodyCommon();
