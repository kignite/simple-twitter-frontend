import axios from "axios";
// import jwt from "jwt-decode";

// const baseURL = "http://simpletwitter.ddns.net/api"

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_BASEURL

// const id = jwt(token).id;

//取得Top 10推薦追隨
export const getTopFollwer = async ({ token }) => {
  try {
    const { data } = await axios.get(`${baseURL}/followships/top_followers`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return { data }
  } catch (error) {
    console.log(error);
  }
};

//追隨
export const postFollowed = async ({userId, token}) => {
  try {
    const { status } = await axios.post(`${baseURL}/followships?=${userId}`, {id: userId}, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return status;
  } catch (error) {
    console.log(error);
  }
};

//取消追隨
export const deleteFollowed = async ({followingId, token}) => {
  try {
    const { status } = await axios.delete(`${baseURL}/followships/${followingId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return status;
  } catch (error) {
    console.log(error);
  }
};