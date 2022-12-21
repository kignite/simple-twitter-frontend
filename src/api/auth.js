import axios from "axios";

// const baseURL = "http://simpletwitter.ddns.net";
const baseURL = "https://calm-basin-50282.herokuapp.com";

export const login = async ({ account, password }, role) => {
  try {
    const { data } = await axios.post(`${baseURL}/api/${role}/login`, {
      account,
      password,
    });

    const { token, status } = data;
    if (token) {
      return { success: true, ...data };
    }
    return status;
  } catch (error) {
    console.log('login-failed:', error)
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
      // console.log(status);
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
    const { status } = await axios.put(`${baseURL}/api/users/${userID}/setting`,
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
    console.log(status)
    if (status === 200) {
      return { success: true };
    }
  } catch (error) {
    const errorMessage = JSON.parse(error.request.response)
    return errorMessage;
  }
};

export const getAccountSetting = async ({
  userID,
  token,
}) => {
  try {
    const { data } = await axios.get(`${baseURL}/api/users/${userID}/setting`,
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

