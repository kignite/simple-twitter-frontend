import axios from "axios";

const baseURL = "https://calm-basin-50282.herokuapp.com/api";

export const getAllTweets = async ({token}) => {
  try {
    const data = await axios.get(`${baseURL}/tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};


