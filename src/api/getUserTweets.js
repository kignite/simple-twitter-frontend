import axios from "axios";

const baseURL = "https://calm-basin-50282.herokuapp.com/api";


export const getUserTweets = async ({ id, token }) => {
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

export const getUserReplies = async ({ id, token }) => {
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

export const getUserInfo = async ({ id, token }) => {
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

export const getUserLikes = async ({ id, token }) => {
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

export const uploadUserInfo = async ({ id, token, file }) => {
  try {
    const { status } = await axios.put(`${baseURL}/users/${id}`, file, {
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

// admin

export const adminGetUserTweets = async ({ token }) => {
  try {
    const data = await axios.get(`${baseURL}/admin/tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const adminDeleteUserTweet = async ({ tweetId, token }) => {
  try {
    const data = await axios.delete(`${baseURL}/admin/tweets/${tweetId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if (data) {
      // console.log(data)
    }
  } catch (error) {
    console.log(error)
  }
}

export const adminGetUsersData = async ({ token }) => {
  try {
    const data = await axios.get(`${baseURL}/admin/users`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}


