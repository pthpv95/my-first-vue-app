import { postAsync, BASE_URL } from "../../services/HttpClient"

const registerUser = async (firstName, lastName, userName) => {
  const url = BASE_URL + 'users';
  const payload = {
    firstName, lastName, userName
  }
  return postAsync(url, payload);
}

export {
  registerUser
}