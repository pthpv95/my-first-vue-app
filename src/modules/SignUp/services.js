import { postAsync, BASE_URL } from "../../services/HttpClient"

const registerUser = async (firstName, lastName, userName, password) => {
  const url = BASE_URL + 'users';
  const payload = {
    firstName, lastName, userName, password
  }
  return postAsync(url, payload);
}

export {
  registerUser
}