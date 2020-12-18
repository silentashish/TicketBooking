import axios from 'axios';

export const login = (body) => {
  const options = {
    url: `https://api.stadt.diagonal.solutions/api/v1/login`,
    data: body,
    method: 'post',
  };
  return axios(options);
};

export const movieListApi = (body) => {
  const options = {
    url: `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${body.page}`,
    method: 'get',
  };
  return axios(options);
};
