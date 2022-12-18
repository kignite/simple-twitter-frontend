import axios from "axios";
import jwt from "jwt-decode";

// const baseURL = "http://simpletwitter.ddns.net/api";
const baseURL = "https://calm-basin-50282.herokuapp.com/api";


export const getUserTweets = async ({ token }) => {
  const id = jwt(token).id;
  try {
    const data = await axios.get(`${baseURL}/users/${id}/tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserReplies = async ({ token }) => {
  const id = jwt(token).id;
  try {
    const data = await axios.get(`${baseURL}/users/${id}/replied_tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async ({ token }) => {
  const id = jwt(token).id;
  try {
    const { data } = await axios.get(`${baseURL}/users/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    // console.log('取得個人資料成功')
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserLikes = async ({ token }) => {
  const id = jwt(token).id;
  try {
    const data = await axios.get(`${baseURL}/users/${id}/likes`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadUserInfo = async ({ token, info }) => {
  const id = jwt(token).id;
  try {
    const { status } = await axios.put(`${baseURL}/users/${id}`, info, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
    console.log(status)
  } catch (error) {
    console.log(error)
  }
}


