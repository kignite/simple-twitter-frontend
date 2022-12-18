import axios from "axios";
import jwt from "jwt-decode";

// const baseURL = "http://simpletwitter.ddns.net/api";
const baseURL = "https://calm-basin-50282.herokuapp.com/api";

//取得特定使用者的所有"推文"
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

//取得特定使用者的所有"回覆"
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

//取得特定(當前)使用者資訊
export const getUserInfo = async ({ token }) => {
  const id = jwt(token).id;
  try {
    const { data } = await axios.get(`${baseURL}/users/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    console.log('取得個人資料成功')
    return data;
  } catch (error) {
    console.log(error);
  }
};

//取得特定使用者"喜歡的內容"
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

//上傳使用者資料
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
};

//取得特定使用者的追隨者
export const getUserFollower = async ({ token }) => {
  const id = jwt(token).id;
  try {
    const { data } = await axios.get(`${baseURL}/users/${id}/followers`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return { data };
  } catch (error) {
    console.log(error)
  }
};

//取得特定使用者的正在追隨
export const getUserFollowing = async ({ token }) => {
  const id = jwt(token).id;
  try {
    const { data } = await axios.get(`${baseURL}/users/${id}/followings`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return { data };
  } catch (error) {
    console.log(error)
  }
};

// 新增推文
export const postTweet = async ({ token, tweet }) => {
  try {
    const { status } = await axios.post(`${baseURL}/tweets`, tweet, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return status
  } catch (error) {
    console.log(error)
  }
}

// 回覆一則貼文
export const postReply = async ({ token, tweetid, reply }) => {
  console.log(tweetid,reply)
  try {
    const { status } = await axios.post(`${baseURL}/tweets/${tweetid}/replies`, reply, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return status
  } catch (error) {
    console.log(error)
  }
}
