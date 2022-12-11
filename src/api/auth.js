import axios from "axios";

const baseURL = "https://calm-basin-50282.herokuapp.com"

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseURL}/api/users/login`, {
      account,
      password
    })

    const { token } = data;

    console.log(data)
    if (token) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.log('login-failed:', error)
  }
}

