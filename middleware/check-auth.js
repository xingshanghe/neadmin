import {getUserFromCookie, getUserFromSessionStorage, getFromCookie, getFromSessionStorage} from '~/utils/auth.js';

export default function({ isServer, store, req }) {
  if (isServer && !req) {
    return ;
  }
  const user = isServer ? getUserFromCookie(req) : getUserFromSessionStorage();
  store.commit('SET_USER', user);

  const access_token = isServer ? getFromCookie(req, 'access_token') : getFromSessionStorage('access_token');
  store.commit('SET_ACCESS_TOKEN', access_token);
};
