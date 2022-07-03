import axios from 'axios';
import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';


let store;
let instance;
let currentToken;

// Create a new instance with currentToken
const getDefaultOptions = () => {
  return {
    baseURL: 'https://localhost:7010/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentToken}`,
      'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
      'X-Requested-With': 'XMLHttpRequest',
      'Expires': "-1"
    },
  };
};

// If instance is not set, create a new instance
const getInstance = () => {
  if (!instance) {
    const defaultOptions = getDefaultOptions();
    instance = axios.create(defaultOptions);
  }
  return instance;
};

export const encodeGetParams = (params) => {
  if (!params || isEmpty(params)) {
    return undefined;
  }
  params = {...params};
  const keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!!params[key] && params[key]._isAMomentObject) {
      params[key] = params[key].toISOString();
    }
  }
  return queryString.stringify(params);
};

export const Get = ({instance, url, params}) => {
  params = encodeGetParams(params);
  if (params) {
    url += '?';
    url += params;
  }
  return (instance || getInstance()).get(url);
};
export const Put = ({instance, url, params}) => {
  return (instance || getInstance()).put(url, params);
};
export const Post = ({instance, url, params}) => {
  return (instance || getInstance()).post(url, params);
};
export const PostForm = ({instance, url, params}) => {
  return (instance || getInstance()).post(url, params, {
    headers: { ['Content-Type']: 'multipart/form-data' }
  });
};
export const Patch = ({instance, url, params}) => {
  return (instance || getInstance()).patch(url, params);
};
export const Delete = ({instance, url, params}) => {
  return (instance || getInstance()).delete(url, { data: params });
};
