export const baseUrl = 'http://localhost:3001';
export const numResults = 30;

export const defaultAxiosConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    "x-access-token": ""
  },

  timeout: 1000
};