import { getAsync, BASE_URL, postAsync } from "../../services/HttpClient";

const getFriendSuggestions = async (userId) => {
  const url = BASE_URL + `contacts/${userId}/contacts-suggestion`;
  return getAsync(url);
}

const addContact = async (userId, contactId) => {
  const url = BASE_URL + 'contacts';
  return await postAsync(url, {
    requesterId: userId,
    receiverId: contactId
  })
}

export {
  getFriendSuggestions,
  addContact
}