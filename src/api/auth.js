import axios from "axios";

const baseURL = "https://calm-basin-50282.herokuapp.com";

export const login = async ({ account, password }, role) => {
  try {
    const { data } = await axios.post(`${baseURL}/api/users/login`, {
      account,
      password,
    });

    const { token, user } = data;

    if (user.role === role && token) {
      console.log(`${user.role}登入成功`)
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    // console.log('login-failed:', error)
    return { error };
  }
};

export const regist = async ({
  email,
  account,
  password,
  checkPassword,
  name,
}) => {
  try {
    const { status } = await axios.post(`${baseURL}/api/users`, {
      email,
      account,
      password,
      checkPassword,
      name,
    });
    if (status === 200) {
      console.log(status);
      return { success: true };
    }
  } catch (error) {
    const { status } = error.request;
    console.log("regist-failed:", status);
    if (status) {
      return { success: false };
    }
  }
};
