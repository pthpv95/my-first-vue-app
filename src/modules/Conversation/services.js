import { getAsync, BASE_URL } from "../../services/HttpClient"

const getContacts = async () => {
  const url = BASE_URL + `contacts/user`
  return getAsync(url)
}

const getConversationInfo = async (contactUserId) => {
  const url = BASE_URL + `api/messages/contact/${contactUserId}`
  return getAsync(url)
}

export { getContacts, getConversationInfo }