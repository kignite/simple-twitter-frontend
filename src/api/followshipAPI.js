import axios from "axios";
// import jwt from "jwt-decode";

// const baseURL = "http://simpletwitter.ddns.net/api";
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
    return { data }
  } catch (error) {
    console.log(error)
  }
}