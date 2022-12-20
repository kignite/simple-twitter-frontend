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

//取得單一特定推文
export const getOneTweet = async ({id, token}) => {
  try {
    const {data} = await axios.get(`${baseURL}/tweets/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    console.log("取得單一推文成功")
    return {data};
  } catch (error) {
    console.log(error);
  }
};

//取得單一推文回覆串
export const getOneTweetReplies = async ({id, token}) => {
  try {
    const {data} = await axios.get(`${baseURL}/tweets/${id}/replies`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return {data};
  } catch (error) {
    console.log(error);
  }
};

//對一則推文like
export const postTweetLike = async ({tweetId, token}) => {
  console.log(token);
  console.log(tweetId);
  try {
    const { status } = await axios.post(`${baseURL}/tweets/${tweetId}/like`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return status;
  } catch (error) {
    console.log(error);
  }
};

//對一則推文unlike
export const postTweetUnLike = async ({tweetId, token}) => {
  console.log(token);
  console.log(tweetId);
  try {
    const { status } = await axios.post(`${baseURL}/tweets/${tweetId}/unlike`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return status;
  } catch (error) {
    console.log(error);
  }
};