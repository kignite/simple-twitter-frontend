import axios from "axios";

// const baseURL = "http://simpletwitter.ddns.net/api";
const baseURL = "https://calm-basin-50282.herokuapp.com/api";

//取得前台所有推文
export const getAllTweets = async ({token}) => {
  try {
    const {data} = await axios.get(`${baseURL}/tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return {data};
  } catch (error) {
    console.log(error);
  }
};
