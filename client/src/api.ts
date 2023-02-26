import axios from 'axios';
const PORT = process.env.REACT_APP_BASE_URL || 'http://13.124.111.98:3040';
async function get(apiUrl: string) {
  const result = await axios.get(`${PORT}${apiUrl}`, {
    withCredentials: true,
  });

  if (!result) {
    throw new Error('ERROR');
  }

  return result;
}

async function post<T>(apiUrl: string, data: T) {
  const result = await axios.post(`${PORT}${apiUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return result;
}

async function patch<T>(apiUrl: string, data: T) {
  const result = await axios.patch(`${PORT}${apiUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return result;
}

// 삭제 요청 할 데이터를 객체 형식으로 할당

async function del(apiUrl: string) {
  const result = await axios.delete(`${PORT}${apiUrl}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return result;
}
async function uploadFile<T>(apiUrl: string, data: T) {
  const result = await axios.patch(`${PORT}${apiUrl}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return result;
}

// 아래처럼 export하면, import * as Api 로 할 시 Api.get, Api.post 등으로 쓸 수 있음.
export { get, post, patch, del as delete, uploadFile };
