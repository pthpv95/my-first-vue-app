const BASE_URL = "https://localhost:5001/"

// const registerUser = (userName, firstName, lastName) => {
//   const payload = {
//     userName,
//     firstName,
//     lastName
//   }
//   const url = BASE_URL + "users"

//   return fetch(url, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     headers: {
//       co
//     }
//   })
// }


const getAsync = async (url) => {
  const response = await fetch(url);
  return response.json();
}

const postAsync = async (url, payload) => {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return response.json();
}

export { getAsync, postAsync, BASE_URL }
