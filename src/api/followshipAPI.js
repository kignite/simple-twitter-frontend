import axios from "axios";
// import jwt from "jwt-decode";

// const baseURL = "http://simpletwitter.ddns.net/api"
const baseURL = "https://calm-basin-50282.herokuapp.com/api";

// const id = jwt(token).id;

//取得Top 10推薦追隨
export const getTopFollwer = async ({ token }) => {
  try {
    const { data } = await axios.get(`${baseURL}/followships/top_followers`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    console.log(data)
    return { data }
  } catch (error) {
    console.log(error);
  }
};

//追隨
export const postFollowed = async ({userId, token}) => {
  console.log(userId)
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