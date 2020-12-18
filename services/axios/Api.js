import axios from 'axios';

export const login = (body) => {
  const options = {
    url: `/login`,
    data: body,
    method: 'post',
  };
  return axios(options);
};
