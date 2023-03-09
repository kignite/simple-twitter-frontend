import axios from "axios";
// const baseURL = "http://simpletwitter.ddns.net/api";

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_BASEURL

export const login = async ({ account, password }, role) => {
  try {
    const { data } = await axios.post(`${baseURL}/${role}/login`, {
      account,
      password,
    });

    const { token, status } = data;
    if (token) {
      return { success: true, ...data };
    }
    return status;
  } catch (error) {
    return { success: false }
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
    const { status } = await axios.post(`${baseURL}/users`, {
      email,
      account,
      password,
      checkPassword,
      name,
    });
    if (status === 200) {
      return { success: true };
    }
  } catch (error) {
    const errorMessage = JSON.parse(error.request.response)
    return { success: false, errorMessage: errorMessage }
  }
};

export const acountSetting = async ({
  userID,
  token,
  email,
  account,
  password,
  checkPassword,
  name,
}) => {
  try {
    const { status } = await axios.put(`${baseURL}/users/${userID}/setting`,
      {
        email,
        account,
        password,
        checkPassword,
        name
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      },
    );
    if (status === 200) {
      return { success: true };
    }
  } catch (error) {
    const errorMessage = JSON.parse(error.request.response)
    return { success: false, errorMessage: errorMessage }
  }
};

export const getAccountSetting = async ({
  userID,
  token,
}) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/${userID}/setting`,
      {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      },
    );
    return data;

  } catch (error) {
    console.log("setting-failed:", error);
    return { success: false };

  }
};

export const checkPermmision = async ({ token }) => {
  try {
    const { status } = await axios({
      method: 'GET',
      url: `${baseURL}/users/token `,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (status) {
      return { success: true }
    }
  }
  catch (error) {
    if (error) return { success: false }
  }
}