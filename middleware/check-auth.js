import { getFromCookie, getFromLocalStorage } from '~/utils/index.js';
import { getJwtFromCookie, getJwtFromSessionStorage, getJwtFromLocalStorage } from '~/utils/auth.js';
import consts from '~/utils/consts.js';

export default function({ store, req }) {
  if (process.server && !req) {
    return ;
  }
  const keepLogin = process.server ? getFromCookie(req, consts.KEEP_LOGIN_KEY) : getFromLocalStorage(consts.KEEP_LOGIN_KEY);
  const jwtData = process.server ? getJwtFromCookie(req) : keepLogin ? getJwtFromLocalStorage() : getJwtFromSessionStorage();
  if (jwtData) {
    store.commit('SET_JWT_DATA', jwtData);
  }
};
