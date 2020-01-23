import AuthService from './AuthService';

const BASE_URL = "http://localhost:5000/"

const authService = new AuthService();

const getAsync = async (url) => {
  const token = await authService.getToken();
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}

const postAsync = async (url, payload) => {
  const token = await authService.getToken();
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })

  return response.json();
}

export { getAsync, postAsync, BASE_URL }
