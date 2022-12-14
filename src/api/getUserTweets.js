import axios from "axios";

const baseURL = "https://calm-basin-50282.herokuapp.com";

//user

export const getUserTweet = async ({ id, token }) => {
  // console.log(id,"=",token)
  try {
    const data = await axios.get(`${baseURL}/api/users/${id}/tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    // console.log(data);
    return data;

  } catch (error) {
    console.log(error)
  }

}

// admin

export const adminGetUserTweets = async ({ token }) => {
  try {
    const data = await axios.get(`${baseURL}/api/admin/tweets`, {
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

export const adminDeletUserTweet = async ({ tweetId, token }) => {
  try {
    const data = await axios.delete(`${baseURL}/api/admin/tweets/${tweetId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    console.log(data)
  } catch (error) {
    console.log(error)
  }
}